'use client';

import { Suspense, useState, useEffect, useRef } from "react";

function BottomBlur() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const footer = document.querySelector('footer');
    let footerVisible = false;

    const contact = document.getElementById('contact');
    let contactVisible = false;

    const checkScroll = () => {
      const inHero = window.scrollY < window.innerHeight * 0.5;
      setHidden(inHero || footerVisible || contactVisible);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });

    const obs = new IntersectionObserver(([e]) => {
      footerVisible = e.isIntersecting;
      checkScroll();
    }, { threshold: 0 });

    const obsContact = new IntersectionObserver(([e]) => {
      contactVisible = e.isIntersecting;
      checkScroll();
    }, { threshold: 0 });

    if (footer) obs.observe(footer);
    if (contact) obsContact.observe(contact);

    return () => {
      obs.disconnect();
      obsContact.disconnect();
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);
  if (hidden) return null;
  return (
    <div
      className="fixed bottom-0 left-0 right-0 pointer-events-none z-40"
      style={{
        height: 60,
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
      }}
    />
  );
}
import Image from "next/image";
import {
  HeroSection,
  FeatureSection,
  CTASection,
  SectionBlock,
  HeadingBlock,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@momo-webplatform/mobase";
import { useScrollCount } from "@/components/CountUp";
import SplineScene from "@/components/SplineScene";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/FadeIn";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import TestimonialSlider from "@/components/TestimonialSlider";
import WordReveal, { WordRevealText } from "@/components/WordReveal";

const ACTIVITIES = [
  {
    name: "User Immersion",
    description: "Gặp gỡ user tại nhà/cửa hàng riêng",
    image: "/assets/activity/user_immersion.png",
  },
  {
    name: "CS Shadowing",
    description: "Phân tích và gọi outbound cùng CS",
    image: "/assets/activity/cs_shadowing.png",
  },
  {
    name: "CS Audio Review",
    description: "Nghe các cuộc gọi với users thu sẵn",
    image: "/assets/activity/cs_audio.png",
  },
  {
    name: "CEE Report",
    description: "Đọc report trải nghiệm user từ CEE",
    image: "/assets/activity/cee_report.png",
  },
  {
    name: "User Walk In",
    description: "Gặp gỡ user tại văn phòng MoMo",
    image: "/assets/activity/user_walk_in.png",
  },
];

const GUIDELINES = [
  { src: "/assets/guideline/guideline_1.png", title: "Chọn hoạt động", description: "Chọn 1 trong 5 hoạt động phù hợp với lịch của bạn — User Immersion, CS Shadowing, CS Audio Review, CEE Report hoặc User Walk In." },
  { src: "/assets/guideline/guideline_2.png", title: "Nhận nhắc lịch", description: "Hệ thống sẽ gửi lịch nhắc và thông tin cần thiết để bạn chuẩn bị trước khi tham gia." },
  { src: "/assets/guideline/guideline_3.png", title: "Trải nghiệm", description: "Tham gia trực tiếp — gặp gỡ, lắng nghe và quan sát khách hàng thực tế trong môi trường của họ." },
  { src: "/assets/guideline/guideline_4.png", title: "Ghi nhận", description: "Ghi lại những insight quan trọng và nộp báo cáo sau buổi để đóng góp vào kho dữ liệu thấu cảm của MoMo." },
  { src: "/assets/guideline/guideline_5.png", title: "Chia sẻ & follow-up", description: "Chia sẻ insight với team và theo dõi những thay đổi bạn muốn thực hiện dựa trên những gì đã học được." },
];

const TESTIMONIALS = [
  {
    avatar: "/assets/user_feedback/11.png",
    name: "Anh Nguyễn Mạnh Tường",
    title: "Chief Executive Officer",
    comment:
      "Hầu hết các sản phẩm chúng ta build đang giải quyết JTBD của MoMo, không phải của users. Customer 2H giúp Managers thấu cảm để xây dựng sản phẩm xuất sắc.",
  },
  {
    avatar: "/assets/user_feedback/6.png",
    name: "Anh Nguyễn Bá Diệp",
    title: "Co Founder - Senior Vice President",
    comment:
      "Sau một case khiếu nại, tôi nhận ra nếu tôi là khách hàng tôi sẽ không bao giờ quay lại. Chúng ta cần xây dựng lại niềm tin.",
  },
  {
    avatar: "/assets/user_feedback/7.png",
    name: "Anh Đỗ Quang Thuận",
    title: "Executive Vice Chairman & President",
    comment:
      "Tham gia để khám phá những vấn đề phức tạp — ví dụ: \"đối tác MoMo\" có phải nhãn đúng khi họ tự coi mình là người bán?",
  },
  {
    avatar: "/assets/user_feedback/10.png",
    name: "Anh Nguyễn Khánh Toàn",
    title: "Head of Product - Payment",
    comment:
      "Đồng cảm - 'Ngứa nghề' - Trách nhiệm. Sau 2 buổi CS shadowing, tôi cảm nhận được nỗi lòng của cả khách hàng lẫn đội CS.",
  },
  {
    avatar: "/assets/user_feedback/9.png",
    name: "Chị Trịnh Thu Ngọc",
    title: "Senior Manager - Legal",
    comment:
      "Bất ngờ - Thú Vị - Học hỏi được nhiều. Mỗi lần gặp user là một lần bất ngờ, bạn sẽ hiểu nhu cầu và nhận được gợi ý sản phẩm.",
  },
  {
    avatar: "/assets/user_feedback/8.png",
    name: "Anh Phạm Đức Huy",
    title: "Manager - BMC",
    comment:
      "Gần dân – Thử dân – Vì dân. Show users trước, xin sếp duyệt sau. Quy tắc mới: làm xong đầu tuần, validate cuối tuần.",
  },
];

function ParallaxCard({
  activity,
  aspect,
  onInView,
}: {
  activity: { name: string; description: string; image: string };
  aspect: string;
  onInView?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !onInView) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) onInView(); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onInView]);

  return (
    <motion.div ref={containerRef} style={{ y }} className="rounded-3xl overflow-hidden">
      <Image
        src={activity.image}
        alt={activity.name}
        width={800}
        height={600}
        className="w-full h-auto"
        sizes="(max-width: 1024px) 100vw, 55vw"
        quality={60}
      />
    </motion.div>
  );
}

function MetricCard({
  end,
  useLocale,
  title,
  description,
}: {
  end: number;
  useLocale?: boolean;
  title: string;
  description: string;
}) {
  const { ref, display } = useScrollCount<HTMLDivElement>(end, useLocale);
  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4">
      <p className="text-5xl sm:text-6xl font-bold text-pink-500 tabular-nums">
        {display}
      </p>
      <p className="text-lg font-semibold text-gray-700 mt-2">{title}</p>
      <p className="text-sm text-gray-400 mt-1 max-w-[220px]">{description}</p>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeActivity, setActiveActivity] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NAV_LINKS = [
    { label: "Giới thiệu", href: "#about" },
    { label: "Hoạt động", href: "#activities" },
    { label: "Hướng dẫn", href: "#how-it-works" },
    { label: "Leaderboard", href: "#leaderboard" },
    { label: "Chia sẻ", href: "#testimonials" },
  ];

  return (
    <main className="flex flex-col w-full">
      <BottomBlur />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className={`max-w-7xl mx-auto px-6 mt-4 flex items-center transition-all duration-300 ${scrolled ? 'justify-center' : 'justify-between'}`}>

          <AnimatePresence mode="wait">
            {scrolled ? (
              /* Unified compact pill — centered, content-width */
              <motion.div
                key="joined"
                initial={{ opacity: 0, y: -32, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-6 rounded-full bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-lg shadow-black/8 px-4 pr-2 h-12"
              >
                <Image src="/assets/logo-2h.png" alt="Customer 2H" width={328} height={80} className="h-7 w-auto ml-2" />
                <nav className="hidden md:flex items-center gap-5">
                  {NAV_LINKS.map((item) => (
                    <a key={item.href} href={item.href} className="text-sm font-medium text-gray-700 hover:text-[#f95396] transition-colors whitespace-nowrap">
                      {item.label}
                    </a>
                  ))}
                </nav>
                <a href="#subscribe" className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold bg-gradient-to-r from-[#ff82b2] to-[#f95396] text-white shadow-sm shadow-pink-200/50 hover:opacity-90 transition-opacity whitespace-nowrap">
                  Đăng ký ngay
                </a>
              </motion.div>
            ) : (
              /* Hero state — logo left, pill center, CTA right */
              <motion.div
                key="split"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex items-center justify-between"
              >
                <Image src="/assets/logo-2h.png" alt="Customer 2H" width={328} height={80} className="h-10 w-auto" />
                <nav className="hidden md:flex items-center gap-6 rounded-full backdrop-blur-md bg-white/20 border border-white/30 shadow-lg shadow-black/5 px-8 h-12">
                  {NAV_LINKS.map((item) => (
                    <a key={item.href} href={item.href} className="text-sm font-medium text-gray-700 hover:text-[#f95396] transition-colors">
                      {item.label}
                    </a>
                  ))}
                </nav>
                <a href="#subscribe" className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold bg-gradient-to-r from-[#ff82b2] to-[#f95396] text-white shadow-md shadow-pink-200/50 hover:opacity-90 transition-opacity">
                  Đăng ký ngay
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative w-full h-screen overflow-hidden">
        {/* Spline — right 60% only */}
        <div className="absolute top-0 right-0 bottom-0 w-[60%]">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-pink-50 to-white" />}>
            <SplineScene />
          </Suspense>
        </div>

        {/* Fade left edge of Spline into white */}
        <div className="absolute inset-y-0 left-[35%] w-40 bg-gradient-to-r from-white to-transparent pointer-events-none" />

        {/* Content overlay */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
            <div className="max-w-xl">
              <motion.span
                className="text-sm font-semibold text-[#f95396] tracking-wide uppercase"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              >
                Chương trình Customer 2H
              </motion.span>
              <motion.h1
                className="mt-3 text-5xl sm:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
              >
                Vì bạn đâu thể{" "}
                <br />
                <span className="text-[#f95396]">đội trời</span>
                <br />
                Mà chân{" "}
                <span className="text-[#f95396]">không chạm đất</span>
              </motion.h1>
              <motion.p
                className="mt-4 text-lg text-gray-700"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.34 }}
              >
                Để tầm nhìn của Manager chạm đến tim users
              </motion.p>
              <motion.div
                className="mt-6 flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.46 }}
              >
                {["120 phút / tháng", "5 hoạt động", "Theo dõi & Ghi nhận"].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-pink-200 text-sm font-medium text-[#f95396] backdrop-blur-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f95396]" />
                    {pill}
                  </span>
                ))}
              </motion.div>
              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.58 }}
              >
                <a
                  href="#subscribe"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-gradient-to-r from-[#ff82b2] to-[#f95396] text-white shadow-lg shadow-pink-200 hover:opacity-90 transition-opacity"
                >
                  Đăng ký ngay
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white transition-colors"
                >
                  Tìm hiểu thêm
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section id="metrics" className="bg-gradient-to-br from-pink-50 to-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-pink-500 uppercase tracking-widest mb-3">Thành quả tháng 11</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Số phút chạm User của toàn công ty</h2>
            </div>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
            <StaggerItem>
              <MetricCard end={22431} useLocale title="Phút" description="Gấp 400 lần thời gian ánh sáng từ Trái Đất đến Sao Thổ" />
            </StaggerItem>
            <StaggerItem>
              <MetricCard end={120} title="Phút / tháng" description="Mục tiêu tối thiểu mỗi Manager" />
            </StaggerItem>
            <StaggerItem>
              <MetricCard end={5} title="Hoạt động" description="Cách gặp khách hàng linh hoạt" />
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Leaderboard video */}
      <section id="leaderboard" className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <HeadingBlock
              align="center"
              tagline="Leaderboard"
              title="Leaderboard November"
              description="Xem lại video Leaderboard tháng 11."
            />
          </FadeIn>
          <FadeIn delay={0.2} className="mt-10 rounded-2xl overflow-hidden shadow-xl aspect-video">
            <iframe
              src="https://www.youtube.com/embed/56PKT4H7Bt0"
              title="Leaderboard November"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </FadeIn>
        </div>
      </section>

      {/* Why / Feature section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <HeadingBlock
              align="center"
              tagline="Tại sao tham gia?"
              title="Biến thấu cảm thành mục tiêu lãnh đạo"
              description="Chương trình tạo cơ hội giúp Managers+ tương tác với Users ít nhất 2 giờ mỗi tháng qua các hoạt động thú vị"
            />
          </FadeIn>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="bg-[#f7f7f5] py-20 pb-[30vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start">

            {/* Left — sticky: label + static heading + desc + animated card info */}
            <div className="lg:sticky lg:top-28 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                </svg>
                Hoạt động
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                5 cách gặp<br />khách hàng
              </h2>
              <p className="text-gray-500 text-lg">
                Chọn hoạt động phù hợp với lịch trình và phong cách làm việc của bạn.
              </p>
              {/* Animated card title + description replaces CTA button */}
              <div className="mt-2 border-t border-gray-200 pt-5">
                <p className="text-pink-400 text-sm tabular-nums font-medium mb-3">
                  {String(activeActivity + 1).padStart(2, '0')}
                  <span className="mx-2 text-gray-300">/</span>
                  {String(ACTIVITIES.length).padStart(2, '0')}
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeActivity}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col gap-2"
                  >
                    <p className="font-semibold text-gray-900">{ACTIVITIES[activeActivity].name}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{ACTIVITIES[activeActivity].description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right — 5 image-only cards, each floats at different speed */}
            <div className="flex flex-col gap-6">
              {ACTIVITIES.map((a, i) => (
                <ParallaxCard
                  key={a.name}
                  activity={a}
                  aspect="aspect-video"
                  onInView={() => setActiveActivity(i)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">

          {/* Header — testimonial 2-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start mb-20">
            <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
                <path d="M9 12h6M9 16h4"/>
              </svg>
              Hướng dẫn
            </div>
            <div>
              <WordRevealText
                words={[
                  { text: 'Cách', bold: true },
                  { text: 'chương', bold: true },
                  { text: 'trình', bold: true },
                  { text: 'Customer', bold: true },
                  { text: '2H', bold: true },
                  { text: 'vận' },
                  { text: 'hành' },
                ]}
                className="text-3xl sm:text-4xl lg:text-5xl leading-snug text-gray-900 mb-4"
              />
              <p className="text-gray-500 text-lg mt-4">
                Hành trình từ lúc đăng ký đến khi chia sẻ insight — đơn giản, linh hoạt, có tác động.
              </p>
            </div>
          </div>

          {/* Zigzag steps */}
          <div className="flex flex-col">
            {GUIDELINES.map((g, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative">
                  {/* Step row */}
                  <FadeIn direction="none">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${isEven ? '' : 'lg:[direction:rtl]'}`}>
                      {/* Image */}
                      <div className="lg:[direction:ltr]">
                        <div className="rounded-3xl overflow-hidden">
                          <Image
                            src={g.src}
                            alt={g.title}
                            width={800}
                            height={600}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="w-full h-auto"
                            quality={60}
                          />
                        </div>
                      </div>
                      {/* Text */}
                      <div className="lg:[direction:ltr] flex flex-col gap-4 px-2 lg:px-8">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-50 text-pink-500 font-bold text-sm">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{g.title}</p>
                        <p className="text-gray-500 leading-relaxed">{g.description}</p>
                      </div>
                    </div>
                  </FadeIn>

                  {/* Connector line */}
                  {i < GUIDELINES.length - 1 && (
                    <div className="flex justify-center my-8">
                      <div className="w-px h-12 bg-gradient-to-b from-pink-200 to-transparent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Testimonials — word reveal + cards, one section */}
      <section id="testimonials" className="bg-pink-50">
        <WordReveal />
        <TestimonialSlider testimonials={TESTIMONIALS} />
      </section>

      {/* User video reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <HeadingBlock
              align="center"
              tagline="Review từ người dùng"
              title="Trải nghiệm nhanh từ người dùng qua các video ngắn"
            />
          </FadeIn>
          <StaggerChildren className="mt-10 grid md:grid-cols-2 gap-8">
            <StaggerItem>
            <Card className="rounded-2xl overflow-hidden shadow-md border border-pink-50">
              <CardHeader>
                <CardTitle className="text-base">
                  Top 1 Chạm user 12/2024
                </CardTitle>
                <CardDescription>
                  Anh Nghĩa, người chạy đua vĩ đại đã cán đích đầu tiên trong tháng 12/2024.
                </CardDescription>
              </CardHeader>
              <CardContent className="aspect-video p-0">
                <video
                  src="https://raw.githubusercontent.com/thanhdo5-momo/2h-qr-standee/main/assets/videos/1.mp4"
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
              </CardContent>
            </Card>
            </StaggerItem>
            <StaggerItem>
            <Card className="rounded-2xl overflow-hidden shadow-md border border-pink-50">
              <CardHeader>
                <CardTitle className="text-base">Bí kíp trẻ hơn 10 tuổi</CardTitle>
                <CardDescription>
                  Anh Huỳnh đã trẻ hơn tận 10 tuổi sau khi gặp user 120 phút hàng tháng.
                </CardDescription>
              </CardHeader>
              <CardContent className="aspect-video p-0">
                <video
                  src="https://raw.githubusercontent.com/thanhdo5-momo/2h-qr-standee/main/assets/videos/2.mp4"
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
              </CardContent>
            </Card>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-pink-50 py-20 border-t border-pink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start">

            <div className="flex lg:hidden items-center gap-2 text-sm text-gray-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              Liên hệ
            </div>

            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500 pt-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              Liên hệ
            </div>

            <div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug text-gray-900 mb-6">
                Liên hệ hỗ trợ
              </p>
              <p className="text-gray-500 text-lg mb-8">
                Nếu bạn có thắc mắc về chương trình Customer 2H, vui lòng liên hệ:
              </p>
              <a
                href="mailto:customer2h@mservice.com.vn"
                className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 transition-colors text-white rounded-full px-6 py-3.5 font-semibold text-sm"
              >
                customer2h@mservice.com.vn
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer — combined newsletter + contact + nav */}
      <footer className="bg-white border-t border-gray-100">

        {/* Top: logo/contact left, newsletter right */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — brand + contact */}
            <div className="flex flex-col gap-6">
              <Image src="/assets/logo-2h.png" alt="Customer 2H" width={328} height={80} />
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Connecting customers · Inspiring insights · Better operations
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest">[ Email ]</p>
                <a href="mailto:customer2h@mservice.com.vn" className="text-gray-800 hover:text-pink-500 transition-colors text-sm font-medium">
                  customer2h@mservice.com.vn
                </a>
              </div>
            </div>

            {/* Right — newsletter */}
            <div className="flex flex-col gap-4">
              <p className="text-xl font-bold text-gray-900">Đăng ký nhận thông tin</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Đăng ký để nhận thông tin mới nhất về chương trình Customer 2H.
              </p>
              <div className="flex flex-col gap-0 mt-2">
                <input
                  type="text"
                  placeholder="Họ và Tên..."
                  className="border-b border-gray-200 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-pink-400 transition-colors bg-transparent"
                />
                <input
                  type="email"
                  placeholder="Email."
                  className="border-b border-gray-200 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-pink-400 transition-colors bg-transparent"
                />
              </div>
              <a
                href="mailto:customer2h@mservice.com.vn"
                className="mt-2 inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-semibold text-sm transition-colors"
              >
                Đăng ký
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

          </div>
        </div>

        {/* Bottom: nav + copyright */}
        <div className="border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <nav className="flex flex-wrap gap-6">
              {[
                { label: "Giới thiệu", href: "#about" },
                { label: "Hoạt động", href: "#activities" },
                { label: "Hướng dẫn", href: "#how-it-works" },
                { label: "Leaderboard", href: "#leaderboard" },
                { label: "Chia sẻ", href: "#testimonials" },
              ].map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
            <p className="text-xs text-gray-300">Customer 2H · Powered by CIO</p>
          </div>
        </div>

      </footer>
    </main>
  );
}
