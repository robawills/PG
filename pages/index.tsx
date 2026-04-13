import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import TextBlock from "@/components/TextBlock";
import StatsBar from "@/components/StatsBar";
import StickyCardSlider from "@/components/StickyCardSlider";
import CSSCardCarousel from "@/components/CSSCardCarousel";
import CTABanner from "@/components/CTABanner";
import type { StickyCardSliderItem } from "@/components/StickyCardSlider";
import type { CSSCardCarouselItem } from "@/components/CSSCardCarousel";

const features: StickyCardSliderItem[] = [
  {
    anchor: "Primus",
    heading: "Lorem ipsum dolor sit",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.",
    image: {
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop&q=80",
      alt: "Placeholder image",
      width: 1600,
      height: 900,
    },
    href: "#",
    linkText: "Perspiciatis unde",
  },
  {
    anchor: "Secundus",
    heading: "Nemo enim ipsam",
    description:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    image: {
      src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1600&h=900&fit=crop&q=80",
      alt: "Placeholder image",
      width: 1600,
      height: 900,
    },
    href: "#",
    linkText: "Voluptatem sequi",
  },
  {
    anchor: "Tertius",
    heading: "Neque porro quisquam",
    description:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid.",
    image: {
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&h=900&fit=crop&q=80",
      alt: "Placeholder image",
      width: 1600,
      height: 900,
    },
    href: "#",
    linkText: "Exercitationem ullam",
  },
  {
    anchor: "Quartus",
    heading: "At vero eos et accusamus",
    description:
      "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.",
    image: {
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&h=900&fit=crop&q=80",
      alt: "Placeholder image",
      width: 1600,
      height: 900,
    },
    href: "#",
    linkText: "Temporibus autem",
  },
  {
    anchor: "Quintus",
    heading: "Temporibus autem quibusdam",
    description:
      "Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur.",
    image: {
      src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&h=900&fit=crop&q=80",
      alt: "Placeholder image",
      width: 1600,
      height: 900,
    },
    href: "#",
    linkText: "Sapiente delectus",
  },
];

export default function Home() {
  return (
    <Layout
      meta={{
        title: "Home",
        description: "Lorem ipsum dolor sit amet.",
      }}
    >
      <Hero
        signpost="Lorem ipsum"
        heading="Scroll down to see the magic"
        subheading="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
      />

      <TextBlock
        signpost="De finibus"
        heading="Nemo enim ipsam voluptatem quia voluptas"
        body="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
      />

      <StatsBar
        stats={[
          { value: "120+", label: "Lorem ipsum" },
          { value: "4.8m", label: "Dolor sit amet" },
          { value: "99%", label: "Consectetur elit" },
          { value: "50+", label: "Adipiscing velit" },
        ]}
      />

      <TextBlock
        signpost="Version 1"
        heading="GSAP Sticky Card Slider"
        body="Scroll-driven card transitions powered by GSAP and ScrollTrigger."
      />

      <StickyCardSlider items={features} />

      <TextBlock
        signpost="Version 2"
        heading="CSS Card Carousel"
        body="Pure CSS scroll-driven animations using animation-timeline, with a fallback for unsupported browsers."
      />

      <CSSCardCarousel items={features} />

      <TextBlock
        signpost="Inventore"
        heading="Quis autem vel eum iure reprehenderit"
        body="Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate."
      />

      <CTABanner
        signpost="Voluptatem"
        heading="Sed ut perspiciatis unde omnis iste natus"
        buttonText="Lorem ipsum"
        href="#"
      />
    </Layout>
  );
}
