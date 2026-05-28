'use client';

import { Suspense } from "react";
import Image from "next/image";
import {
  HeroSection,
  FeatureSection,
  MetricsSection,
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
import SplineScene from "@/components/SplineScene";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/FadeIn";
import { motion } from "motion/react";
import TestimonialSlider from "@/components/TestimonialSlider";

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

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      {/* Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 mt-4 flex items-center justify-between">
          {/* Logo — no glass */}
          <Image
            src="/assets/logo-2h.png"
            alt="Customer 2H"
            width={328}
            height={80}
            className="h-10 w-auto"
          />

          {/* Nav — glass pill */}
          <nav className="hidden md:flex items-center gap-6 rounded-full backdrop-blur-md bg-white/20 border border-white/30 shadow-lg shadow-black/5 px-8 h-12">
            {[
              { label: "Giới thiệu", href: "#about" },
              { label: "Hoạt động", href: "#activities" },
              { label: "Hướng dẫn", href: "#how-it-works" },
              { label: "Leaderboard", href: "#leaderboard" },
              { label: "Chia sẻ", href: "#testimonials" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-[#f95396] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA — no glass */}
          <a
            href="#subscribe"
            className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold bg-gradient-to-r from-[#ff82b2] to-[#f95396] text-white shadow-md shadow-pink-200/50 hover:opacity-90 transition-opacity"
          >
            Đăng ký ngay
          </a>
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
      <MetricsSection
        idSection="metrics"
        className="bg-gradient-to-br from-pink-50 to-white"
        dataHeading={{
          tagline: "Thành quả tháng 11",
          title: "Số phút chạm User của toàn công ty",
          align: "center",
        }}
        dataMetrics={[
          {
            metricValue: "22,431",
            metricTitle: "Phút",
            metricDescription: "Gấp 400 lần thời gian ánh sáng từ Trái Đất đến Sao Thổ",
          },
          {
            metricValue: "120",
            metricTitle: "Phút / tháng",
            metricDescription: "Mục tiêu tối thiểu mỗi Manager",
          },
          {
            metricValue: "5",
            metricTitle: "Hoạt động",
            metricDescription: "Cách gặp khách hàng linh hoạt",
          },
        ]}
      />

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
      <FeatureSection
        idSection="activities"
        template={3}
        className="bg-gray-50"
        dataHeading={{
          tagline: "Một chương trình",
          title: "5 cách gặp khách hàng",
          description:
            "Chọn hoạt động phù hợp với lịch trình và phong cách làm việc của bạn.",
          align: "center",
        }}
        dataFeatures={ACTIVITIES.map((a) => ({
          title: a.name,
          description: a.description,
          image: a.image,
        }))}
      />

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

      {/* Testimonials */}
      <FadeIn>
        <TestimonialSlider testimonials={TESTIMONIALS} />
      </FadeIn>

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

      {/* Subscribe */}
      <CTASection
        idSection="subscribe"
        template={1}
        className="bg-gradient-to-br from-[#f95396] to-[#ff82b2]"
        dataHeading={{
          tagline: "Tham gia ngay",
          title: "Nhận thông tin về Customer 2H",
          description:
            "Đăng ký để nhận thông tin mới nhất về chương trình Customer 2H.",
          colorScheme: "white",
          align: "center",
        }}
        dataButtons={{
          align: "center",
          buttons: [
            {
              btnName: "Đăng ký",
              variant: "primary",
              className: "bg-white text-[#f95396] hover:bg-pink-50",
              action: "mailto:customer2h@mservice.com.vn",
            },
          ],
        }}
      />

      {/* Contact */}
      <SectionBlock className="bg-white py-12">
        <FadeIn>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HeadingBlock
            align="center"
            tagline="Liên hệ"
            title="Liên hệ hỗ trợ"
            description="Nếu bạn có thắc mắc về chương trình Customer 2H, vui lòng liên hệ:"
          />
          <a
            href="mailto:customer2h@mservice.com.vn"
            className="mt-4 inline-block text-[#f95396] font-medium hover:underline"
          >
            customer2h@mservice.com.vn
          </a>
        </div>
        </FadeIn>
      </SectionBlock>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-10">
        <FadeIn direction="none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Image
              src="/assets/images/logo.png"
              alt="Customer 2H"
              width={100}
              height={30}
              className="h-8 w-auto"
            />
            <p className="text-sm text-gray-500 text-center">
              Connecting customers · Inspiring insights · Better operations
            </p>
            <p className="text-sm text-gray-400">
              Customer 2H Program · Powered by CIO
            </p>
          </div>
          <div className="mt-8">
            <Image
              src="/assets/images/FOOTER.png"
              alt="Footer banner"
              width={1200}
              height={200}
              className="w-full object-cover rounded-xl"
            />
          </div>
        </div>
        </FadeIn>
      </footer>
    </main>
  );
}
