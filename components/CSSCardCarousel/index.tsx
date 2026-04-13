import { useRef, useCallback } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./CSSCardCarousel.module.scss";

const cx = classNames.bind(styles);

export interface CSSCardCarouselItem {
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

interface CSSCardCarouselProps {
  items: CSSCardCarouselItem[];
}

function CardContent({ item }: { item: CSSCardCarouselItem }) {
  return (
    <>
      <h3 className={cx("heading")}>{item.heading}</h3>
      {item.description && (
        <p className={cx("description")}>{item.description}</p>
      )}
      <span className={cx("link")}>
        {item.linkText}
        <svg
          className={cx("arrow")}
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
    </>
  );
}

export default function CSSCardCarousel({ items }: CSSCardCarouselProps) {
  const total = items.length;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const totalItems = total + 1.25;

  const scrollToCard = useCallback(
    (i: number) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      // view-timeline progress: 0% = wrapper enters viewport, 100% = exits
      // Total scroll range = wrapper height + viewport height
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const scrollRange = wrapper.offsetHeight + window.innerHeight;
      const targetProgress = (i + 0.75) / totalItems;
      window.scrollTo({
        top: wrapperTop - window.innerHeight + scrollRange * targetProgress,
        behavior: "smooth",
      });
    },
    [totalItems],
  );

  return (
    <div
      ref={wrapperRef}
      className={cx("wrapper")}
      style={
        {
          "--total-items": totalItems,
          "--wrapper-height": `${total * 80}vh`,
        } as React.CSSProperties
      }
    >
      {/* Fallback: individual cards shown when scroll-driven animations unsupported */}
      <div className={cx("fallback")}>
        {items.map((item) => (
          <div
            key={item.anchor}
            className={cx("fallbackCard")}
            data-row-type="card-block"
          >
            <div className={cx("imageWrap")}>
              <div className={cx("imageLayer")}>
                <div className={cx("imageInner")}>
                  <Image
                    className={cx("image")}
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>
            <a href={item.href} className={cx("content")}>
              <div className={cx("inner")}>
                <CardContent item={item} />
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Enhanced: single sticky card with scroll-driven animations */}
      <div className={cx("card")} data-row-type="card-block">
        <div className={cx("imageWrap")}>
          {items.map((item, i) => (
            <div
              key={item.anchor}
              className={cx("imageLayer")}
              style={
                {
                  "--i": i,
                  zIndex: i,
                } as React.CSSProperties
              }
            >
              <div className={cx("imageInner")}>
                <Image
                  className={cx("image")}
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

        <div className={cx("content")}>
          {items.map((item, i) => (
            <a
              key={item.anchor}
              href={item.href}
              className={cx("inner")}
              style={{ "--i": i } as React.CSSProperties}
              onFocus={() => scrollToCard(i)}
            >
              <CardContent item={item} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
