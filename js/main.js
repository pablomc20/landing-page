// navigation menu
(() => {
    const hamburegrBtn = d.querySelector(".hamburger-btn"),
    navMenu = d.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburegrBtn.addEventListener("click", showNavmenu);
    closeNavBtn.addEventListener("click", hideNavmenu);

    function showNavmenu() {
        navMenu.classList.add("open");
        bodyAcrollingToggle();
    }
    function hideNavmenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyAcrollingToggle();
    }
    function fadeOutEffect() {
        d.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            d.querySelector(".fade-out-effect").classList.remove("active");
        }, 300);
    }

    d.addEventListener("click", (event) => {
        if (event.target.classList.contains("link-item")) {
            if (event.target.hash !== "") {
                event.preventDefault();
                const hash = event.target.hash;
                
                d.querySelector(".section.active").classList.add("hide");
                d.querySelector(".section.active").classList.remove("active");
                d.querySelector(hash).classList.add("active");
                d.querySelector(hash).classList.remove("hide");
                navMenu.querySelector(".active").classList.add("outer-shadow", "active");
                navMenu.querySelector(".active").classList.remove("inner-shadow", "active");
                if (navMenu.classList.contains("open")) {
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    hideNavmenu();
                }else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash){
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    });
                    fadeOutEffect();
                }
                // window.location.hash = hash;
                // console.log(hash);
            }
        }
    })

})();

// about tabs section
(() =>  {
    const aboutSection = d.querySelector(".about-section"),
        tabsContainer = d.querySelector(".about-tabs");
    
    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item") && 
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");

            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");

            aboutSection.querySelector(".tab-content.active").classList.remove('active');
            aboutSection.querySelector(target).classList.add('active');
        }
    })
})();

function bodyAcrollingToggle() {
    d.body.classList.toggle("hidden-scrolling");
}

// about me section
(() => {
    const textoCompleto = document.getElementById("texto-completo"),
    textoRecortado = document.getElementById("texto-recortado"),
    show_more = document.getElementById("show-more"),
    show_less = document.getElementById("show-less");

    const onClickShowMore = () => {
        textoRecortado.style.display = "none"
        textoCompleto.style.display = "block"
    }

    const onClickShowLess = () => {
        textoCompleto.style.display = "none"
        textoRecortado.style.display = "block"
    }

    show_more.addEventListener('click', onClickShowMore);
    
    show_less.addEventListener('click', onClickShowLess);

})();

// portafolio filter and popup
(() => {

    const filterContainer = d.querySelector(".portafolio-filter"),
        poratfolioItemsContainer = d.querySelector(".portafolio-items"),
        portafolioItems = d.querySelectorAll(".portafolio-item"),
        popup = d.querySelector(".portafolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    filterContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("filter-item") && 
        !event.target.classList.contains("active")) {
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");

            const target = event.target.getAttribute("data-target");
            portafolioItems.forEach((item) =>  {
                if (target === item.getAttribute("data-category") || target === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    poratfolioItemsContainer.addEventListener("click", (event) => {
        if(event.target.closest(".portafolio-item-inner")) {
            const portafolioItem = event.target.closest(".portafolio-item-inner").parentElement;
            itemIndex = Array.from(portafolioItem.parentElement.children).indexOf(portafolioItem);
            screenshots = portafolioItems[itemIndex].querySelector(".portafolio-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideShow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyAcrollingToggle()
    }

    function popupSlideShow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");

        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        }else {
            slideIndex++;
        }
        popupSlideShow();
    });

    prevBtn.addEventListener("click", () => {
        if(slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        }else {
            slideIndex--;
        }
        popupSlideShow();
    });

    function popupDetails() {
        if (!portafolioItems[itemIndex].querySelector(".portafolio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
        
        const details = portafolioItems[itemIndex].querySelector(".portafolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portafolioItems[itemIndex].querySelector(".portafolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portafolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    });

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop)
        }
    }
})();

// testimonial slider

(() => {
    const sliderContainer = d.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = d.querySelector(".testi-slider-nav .prev"),
    nextBtn = d.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    });

    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () => {
        if (slideIndex === slides.length - 1) {
            slideIndex = 0;
        }else {
            slideIndex++;
        }
        slider();
    });
    
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = slides.length - 1;
        }else {
            slideIndex--;
        }
        slider();
    })
    
    function slider() {
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();
})();

// hide all section except active 
(() => {
    const sections = d.querySelectorAll(".section");
    sections.forEach(section => {
        if (!section.classList.contains("active")) {
            section.classList.add('hide');
        }
    });
})();

window.addEventListener("load", () => {
    d.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        d.querySelector(".preloader").style.display = "none";
    }, 600);
})