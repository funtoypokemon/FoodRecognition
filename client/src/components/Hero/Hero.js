import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Header from "../header/Header1";
import {
  HeroContainer,
  HeroWrapper,
  HeroLeft,
  HeroRight,
  Image,
  ScrollDown,
  ScrollLink,
} from "./HeroElements";
function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <main>
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Header toggle={toggle} />
      <HeroContainer>
        <HeroWrapper>
          <HeroLeft>
            <h1>Hi, I'm Trung Loi</h1>
            <h5>Software Engineer</h5>
            <p>
              I am incredibly passionate about all things about engineering and
              artificial intelligence. . It causes a lot of difficulty for me,
              but it encourages me to overcome challenges and become a
              high-quality engineer. I might not be a high-quality engineer at
              the moment, but I will motivate myself daily to achieve good
              achievements in the future
            </p>
          </HeroLeft>
          <HeroRight>
            <Image
              src="https://gurupawar.github.io/portfolio/assets/man-svgrepo-com.svg"
              alt="man-svgrepo"
            />
          </HeroRight>
        </HeroWrapper>
        <ScrollDown to="projects">
          <ScrollLink>
            Scroll down
            <img
              src="https://raw.githubusercontent.com/gurupawar/portfolio/main/assets/scroll-down.svg"
              alt="scroll-down"
            />
          </ScrollLink>
        </ScrollDown>
      </HeroContainer>
    </main>
  );
}

export default Hero;
