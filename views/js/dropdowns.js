// dropdown appearance
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
    }, 500); // A small delay is added to prevent immediate hiding when exiting the button
});

dropdown.addEventListener("mouseenter", () => {
    isDropdownVisible = true;
});

dropdown.addEventListener("mouseleave", () => {
    isDropdownVisible = false;
    dropdown.style.animation = "hideDropdown 1s forwards";
    dropdown.style.animationDelay = ".5s";
});


// dropdown for user button with login/logout option
const btnUser = document.querySelector(".user-icon");
const dropdownUser = document.querySelector(".dropdown-menu-user");

let isDropdownUserVisible = false;

btnUser.addEventListener("mouseenter", () => {
    isDropdownVisible = true;
    dropdownUser.style.display = "flex";
    dropdownUser.style.animation = "showDropdown .5s forwards";
});

btnUser.addEventListener("mouseleave", () => {
    isDropdownVisible = false;
    setTimeout(() => {
        if (!isDropdownVisible) {
            dropdownUser.style.animation = "hideDropdown 1s forwards";
            dropdownUser.style.animationDelay = ".5s";
        }
    }, 500); // A small delay is added to prevent immediate hiding when exiting the button
});

dropdownUser.addEventListener("mouseenter", () => {
    isDropdownVisible = true;
});

dropdownUser.addEventListener("mouseleave", () => {
    isDropdownVisible = false;
    dropdownUser.style.animation = "hideDropdown 1s forwards";
    dropdownUser.style.animationDelay = ".5s";
});