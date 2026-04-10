import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./StickyCardSlider.module.scss";

gsap.registerPlugin(ScrollTrigger);

export interface StickyCardSliderItem {
  anchor: string;
  heading: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  href: string;
  linkText: string;
}

interface StickyCardSliderProps {
  items: StickyCardSliderItem[];
}

export default function StickyCardSlider({ items }: StickyCardSliderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerRef = useRef<(HTMLDivElement | null)[]>([]);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textIndexRef = useRef(0);
  const textTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !cardRef.current || items.length < 2) return;

    // Set initial states
    imagesRef.current.forEach((el, i) => {
      if (!el || i === 0) return;
      gsap.set(el, { clipPath: "inset(100% 0 0 0 round var(--radius-3))" });
    });

    const ctx = gsap.context(() => {
      const totalPanels = items.length;
      const transitions = totalPanels - 1;

      // Build a single master timeline for all image reveals
      const tl = gsap.timeline();

      for (let i = 0; i < transitions; i++) {
        const outgoing = imagesRef.current[i];
        const incoming = imagesRef.current[i + 1];
        if (!incoming) continue;

        const pos = `trans${i}`;
        const outgoingInner = outgoing?.querySelector(`.${styles.imageInner}`);
        const incomingInner = incoming.querySelector(`.${styles.imageInner}`);

        // Outgoing image scales down slightly
        if (outgoingInner) {
          tl.fromTo(
            outgoingInner,
            { scale: 1 },
            { scale: 0.97, ease: "none", duration: 1 },
            pos,
          );
        }

        // Outgoing image fades to black from the 75% mark
        if (outgoing) {
          tl.fromTo(
            outgoing,
            { opacity: 1 },
            { opacity: 0.3, ease: "power1.in", duration: 0.25 },
            `${pos}+=0.75`,
          );
        }

        // Incoming image reveals from bottom via clip-path on the layer
        tl.fromTo(
          incoming,
          { clipPath: "inset(100% 0 0 0 round var(--radius-3))" },
          { clipPath: "inset(0% 0 0 0 round var(--radius-3))", ease: "none", duration: 1 },
          pos,
        );

        // Incoming inner scales from slightly zoomed to normal
        if (incomingInner) {
          tl.fromTo(
            incomingInner,
            { scale: 1.03 },
            { scale: 1, ease: "none", duration: 1 },
            pos,
          );
        }

        // Small pause between transitions so each image holds
        if (i < transitions - 1) {
          tl.to({}, { duration: 0.3 });
        }
      }

      // Calculate end so the card fills the wrapper exactly when it unpins
      const cardHeight = cardRef.current!.offsetHeight;
      const endOffset = cardHeight + 80; // card height + margin-top

      // Pin and scrub the timeline to scroll
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 80px",
        end: `bottom ${endOffset}px`,
        pin: cardRef.current,
        pinSpacing: false,
        scrub: 1,
        animation: tl,
      });

      // Text switching based on scroll progress
      const switchText = (newIndex: number) => {
        const prev = textIndexRef.current;
        if (newIndex === prev) return;

        const isLast = newIndex === totalPanels - 1;

        // Kill any in-progress text timeline
        if (textTlRef.current) {
          textTlRef.current.kill();
          textTlRef.current = null;
        }

        // Force-reset all layers to their correct state immediately
        innerRef.current.forEach((el, j) => {
          if (!el) return;
          const children = el.children;
          if (j === newIndex) {
            // Active: make wrapper visible, children will animate in
            gsap.set(el, { opacity: 1 });
            gsap.set(children, { opacity: 0, y: 4 });
          } else {
            // Inactive: fully hidden
            gsap.set(el, { opacity: 0 });
            gsap.set(children, { opacity: 0 });
          }
        });

        // Build a new timeline for the stagger-in
        const enterTl = gsap.timeline();
        const activeInner = innerRef.current[newIndex];
        if (activeInner) {
          enterTl.to(activeInner.children, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.18,
            ease: "power3.out",
          });
        }
        textTlRef.current = enterTl;

        if (linkRef.current) {
          linkRef.current.href = items[newIndex].href;
        }

        textIndexRef.current = newIndex;
      };

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 80px",
        end: `bottom ${endOffset}px`,
        onUpdate: (self) => {
          const tlProgress = self.progress;
          const tlDuration = tl.duration();

          let accumulated = 0;
          let newTextIndex = 0;

          for (let i = 0; i < transitions; i++) {
            const transitionDuration = 1;
            const gapDuration = i < transitions - 1 ? 0.3 : 0;
            const segmentDuration = transitionDuration + gapDuration;
            const triggerPoint =
              (accumulated + transitionDuration * 0.75) / tlDuration;

            if (tlProgress >= triggerPoint) {
              newTextIndex = i + 1;
            }

            accumulated += segmentDuration;
          }

          newTextIndex = Math.min(newTextIndex, totalPanels - 1);
          switchText(newTextIndex);
        },
      });
    }, wrapperRef);

    return () => {
      if (textTlRef.current) textTlRef.current.kill();
      ctx.revert();
    };
  }, [items]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{ height: `${items.length * 80}vh` }}
    >
      <div ref={cardRef} className={styles.card} data-row-type="card-block">
        {/* Stacked images — each revealed via scrubbed clip-path */}
        <div className={styles.imageWrap}>
          {items.map((item, i) => (
            <div
              key={item.anchor}
              ref={(el) => {
                imagesRef.current[i] = el;
              }}
              className={styles.imageLayer}
              style={{ zIndex: i }}
            >
              <div className={styles.imageInner}>
                <Image
                  className={styles.image}
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="100%"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {/* White content panel */}
        <a ref={linkRef} href={items[0].href} className={styles.content}>
          {items.map((item, i) => (
            <div
              key={item.anchor}
              ref={(el) => {
                innerRef.current[i] = el;
              }}
              className={styles.inner}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {item.description && (
                <p className={styles.description}>{item.description}</p>
              )}
              <h3 className={styles.heading}>{item.heading}</h3>
              <span className={styles.link}>
                {item.linkText}
                <svg
                  className={styles.arrow}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          ))}
        </a>
      </div>
    </div>
  );
}
