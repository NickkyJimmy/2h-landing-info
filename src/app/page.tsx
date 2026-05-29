'use client';

import { Suspense, useState, useEffect } from "react";

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
import { motion, AnimatePresence } from "motion/react";
import TestimonialSlider from "@/components/TestimonialSlider";
import WordReveal from "@/components/WordReveal";

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
  { src: "/assets/guideline/guideline_1.png", alt: "Chọn hoạt động" },
  { src: "/assets/guideline/guideline_2.png", alt: "Nhận nhắc lịch" },
  { src: "/assets/guideline/guideline_3.png", alt: "Trải nghiệm" },
  { src: "/assets/guideline/guideline_4.png", alt: "Ghi nhận" },
  { src: "/assets/guideline/guideline_5.png", alt: "Chia sẻ & follow-up" },
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
    <main className="flex flex-col w-full overflow-hidden">
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
          <StaggerChildren className="mt-12 grid md:grid-cols-2 gap-8">
            <StaggerItem>
            <Card className="border border-pink-100 shadow-lg shadow-pink-50/50 rounded-3xl">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                  <span className="text-xl">💡</span>
                </div>
                <CardTitle className="text-xl">
                  Lan toả tinh thần Customer Centricity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed mb-4">
                  Chương trình tạo cơ hội giúp Managers+ tương tác với Users ít
                  nhất 2 giờ mỗi tháng qua các hoạt động thú vị.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f95396] flex-shrink-0" />
                    120 phút với khách hàng.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f95396] flex-shrink-0" />
                    Lắng nghe, quan sát, cảm nhận thực tế.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f95396] flex-shrink-0" />
                    Ghi chú, audio, video và phân tích.
                  </li>
                </ul>
              </CardContent>
            </Card>
            </StaggerItem>

            <StaggerItem>
            <Card className="border border-pink-100 shadow-lg shadow-pink-50/50 rounded-3xl overflow-hidden bg-gradient-to-br from-[#f95396] to-[#ff82b2] text-white">
              <CardHeader>
                <Badge
                  variant="outline"
                  className="w-fit border-white/40 text-white text-xs mb-2"
                >
                  Tốc độ cảm User Vượt Xa Ánh Sáng!
                </Badge>
                <CardTitle className="text-xl text-white">
                  Thành quả tháng 11
                </CardTitle>
                <CardDescription className="text-white/80">
                  Số phút chạm User của toàn công ty
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold text-white">22,431</p>
                <p className="text-sm text-white/80 mt-2">phút</p>
                <p className="text-sm text-white/70 mt-4">
                  Gấp 400 lần thời gian ánh sáng từ Trái Đất đến Sao Thổ
                </p>
              </CardContent>
            </Card>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="bg-[#f7f7f5] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">

          {/* Header — two column like Noora */}
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 mb-16">
              {/* Left label */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                </svg>
                Hoạt động
              </div>
              {/* Right — heading + desc + CTA */}
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  5 cách gặp<br />khách hàng
                </h2>
                <p className="text-gray-500 text-lg mb-8 max-w-md">
                  Chọn hoạt động phù hợp với lịch trình và phong cách làm việc của bạn.
                </p>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 transition-colors text-white rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Xem hướng dẫn
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Bento card grid */}
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {ACTIVITIES.map((a, i) => (
              <StaggerItem key={a.name} className={i === 4 ? 'sm:col-span-3' : 'sm:col-span-1'}>
                <div className="group cursor-default">
                  <Image
                    src={a.image}
                    alt={a.name}
                    width={800}
                    height={800}
                    sizes={i === 4 ? '100vw' : '33vw'}
                    className="w-full h-auto rounded-3xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <p className="font-semibold text-gray-900 mt-3">{a.name}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{a.description}</p>
                </div>
              </StaggerItem>
            ))}

          </StaggerChildren>

        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <HeadingBlock
              align="center"
              tagline="Hướng dẫn"
              title="Cách chương trình Customer 2H vận hành"
              description="Xem nhanh hành trình từ lúc đăng ký đến khi hoàn tất ghi nhận để mọi người cùng thấu cảm khách hàng và biến insight thành hành động."
            />
          </FadeIn>
          <FadeIn delay={0.15} className="mt-12 relative">
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {GUIDELINES.map((g, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-2">
                      <Card className="rounded-2xl overflow-hidden border border-pink-100">
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={g.src}
                            alt={g.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm font-medium text-gray-700 text-center">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f95396] text-white text-xs mr-2">
                              {i + 1}
                            </span>
                            {g.alt}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </FadeIn>
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
