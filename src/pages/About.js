import React from "react";
import "./AboutUs.css"; // ملف التنسيق الخاص بالصفحة

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* الهيدر الخاص بالصفحة */}
      <header className="about-header">
        <h1>About us</h1>
      </header>

      {/* المحتوى الرئيسي */}
      <div className="about-content"> 
        <section className="founder-section">
          <h2>Meet the Founder</h2>
          <h3 className="founder-name">Eng. Ahmed ElSewedy</h3>
          
          <p>President & CEO of the Board of Directors at ELSEWEDY ELECTRIC. Eng. Ahmed currently chairs several business councils including Egypt-Lebanon, Egypt-Zambia, Egypt-Ethiopia, and the Egyptian Chinese business council along with being a member of the Egyptian Businessmen Association and President of the German Chamber of Commerce (AHK)& a board member of the Federation of Egyptian Industries (FEI), Egyptian Junior Business Association (EJB), Arab African International Bank, Emaar Misr for Development, and Talaat Moustafa Group Holding (TMGH). Eng. Ahmed Elsewedy was appointed as a member of ELSEWEDY ELECTRIC’s Board of Directors in 2005, and currently serves as President and Chief Executive Officer of the company, leveraging over 35 years of experience in the fields of electricity and energy. In 1986, Elsewedy led the first private cable factory in Egypt, Arab Cables Co., turning it into one of the largest worldwide providers of integrated energy solutions with over thirty production facilities spanning sixteen countries. With his significant contributions, ELSEWEDY ELECTRIC has grown significantly over the years. Through streamlining operations, acquiring new businesses, and penetrating new markets, the company expanded rapidly, currently housing a team of over 17,000 employees and exporting to over 110 countries. Eng. Elsewedy received his B.S. in Electrical Engineering from Cairo University in 1986.</p>

          <img src="/photos/Ahmed-Elsewedy.jpg" alt="Ahmed Elsewedy" className="founder-image" />
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
