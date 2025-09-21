import React, { useEffect, useRef, useState } from "react";
import "./Place.scss";

const Place = () => {
  const placeRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (placeRef.current) {
      observer.observe(placeRef.current);
    }

    return () => {
      if (placeRef.current) observer.unobserve(placeRef.current);
    };
  }, []);

  return (
    <div id="place" ref={placeRef} className={visible ? "fadeInUp" : ""}>
      <div className="container">
        <div className="place">
          <h1>Өтүүчү жер</h1>
          <div className="place--text">
            <h2>Ресторан "Бак Сарай"</h2>
            <h2>дареги</h2>
            <h2> Энгельса көчөсү, 95</h2>
          </div>
          <div className="place--map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12974.69754669239!2d73.88689312521262!3d42.832391898736915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389f39722a863169%3A0xda4044f9821578b9!2z0JHQsNC6INCh0LDRgNCw0Lk!5e0!3m2!1sru!2skg!4v1757512600285!5m2!1sru!2skg"
              width="90%"
              height="100%"
              style={{ border: "0", borderRadius: "20px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            />
          </div>
          <h2>
            Сиздин ыңгайлуулугуңуз үчүн биз <br />
            карта даярдап койдук. Сиз үйлөнүү үлпөтүн <br />
            оңой таап, бизди өзүңүздүн катышуусуңуз <br />
            менен кубантасыз деп ишенебиз!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Place;
