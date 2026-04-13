import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./StickyCardSlider.module.scss";

const cx = classNames.bind(styles);

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

function CardContent({ item }: { item: StickyCardSliderItem }) {
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

export default function StickyCardSlider({ items }: StickyCardSliderProps) {
  const total = items.length;

  return (
    <div
      className={cx("wrapper")}
      style={
        {
          "--total-items": total + 1.25,
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
            >
              <CardContent item={item} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
