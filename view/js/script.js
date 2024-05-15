var swiper1 = new Swiper('.swiper-container1', {
	navigation: {
	  nextEl: '.swiper-button-next1',
	  prevEl: '.swiper-button-prev1'
	},
	slidesPerView: 1,
	spaceBetween: 10,
	// init: false,
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true,
	},

  
	breakpoints: {
	  620: {
		slidesPerView: 1,
		spaceBetween: 20,
	  },
	  680: {
		slidesPerView: 2,
		spaceBetween: 40,
	  },
	  920: {
		slidesPerView: 3,
		spaceBetween: 40,
	  },
	  1240: {
		slidesPerView: 4,
		spaceBetween: 50,
	  },
	  1400: {
		slidesPerView: 5,
		spaceBetween: 60,
	  },
	} 
    });

var swiper2 = new Swiper('.swiper-container2', {
	navigation: {
	  nextEl: '.swiper-button-next2',
	  prevEl: '.swiper-button-prev2'
	},
	slidesPerView: 1,
	spaceBetween: 10,
	// init: false,
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true,
	},

  
	breakpoints: {
	  620: {
		slidesPerView: 1,
		spaceBetween: 20,
	  },
	  680: {
		slidesPerView: 2,
		spaceBetween: 40,
	  },
	  920: {
		slidesPerView: 3,
		spaceBetween: 40,
	  },
	  1240: {
		slidesPerView: 4,
		spaceBetween: 50,
	  },
	  1400: {
		slidesPerView: 5,
		spaceBetween: 60,
	  },
	} 
    });

// Aparicion de dropdown
const btnCategories = document.querySelector(".btn-categories");
const dropdown = document.querySelector(".dropdown-menu");

let isDropdownVisible = false;

btnCategories.addEventListener("mouseenter", () => {
    isDropdownVisible = true;
    dropdown.style.display = "flex";
    dropdown.style.animation = "showDropdown .5s forwards";
});

btnCategories.addEventListener("mouseleave", () => {
    isDropdownVisible = false;
    setTimeout(() => {
        if (!isDropdownVisible) {
            dropdown.style.animation = "hideDropdown 1s forwards";
            dropdown.style.animationDelay = ".5s";
        }
    }, 500); // Añadimos un pequeño retraso para evitar que se oculte inmediatamente al salir del botón
});

dropdown.addEventListener("mouseenter", () => {
    isDropdownVisible = true;
});

dropdown.addEventListener("mouseleave", () => {
    isDropdownVisible = false;
    dropdown.style.animation = "hideDropdown 1s forwards";
    dropdown.style.animationDelay = ".5s";
});