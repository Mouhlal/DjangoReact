import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    quote: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus...",
    img: "assets/img/testimonials/testimonials-1.jpg",
    name: "Saul Goodman",
    role: "Ceo & Founder"
  },
  {
    quote: "Export tempor illum tamen malis malis eram quae irure esse labore...",
    img: "assets/img/testimonials/testimonials-2.jpg",
    name: "Sara Wilsson",
    role: "Designer"
  },
  {
    quote: "Enim nisi quem export duis labore cillum quae magna enim sint...",
    img: "assets/img/testimonials/testimonials-3.jpg",
    name: "Jena Karlis",
    role: "Store Owner"
  },
  {
    quote: "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export...",
    img: "assets/img/testimonials/testimonials-4.jpg",
    name: "Matt Brandon",
    role: "Freelancer"
  },
  {
    quote: "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam...",
    img: "assets/img/testimonials/testimonials-5.jpg",
    name: "John Larson",
    role: "Entrepreneur"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section light-background">
      <div className="container section-title" data-aos="fade-up">
        <span>Testimonials</span>
        <h2>Testimonials</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          speed={600}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 40 },
            1200: { slidesPerView: 3, spaceBetween: 20 }
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item">
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>{item.quote}</span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
                <img src={item.img} className="testimonial-img" alt="" />
                <h3>{item.name}</h3>
                <h4>{item.role}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
