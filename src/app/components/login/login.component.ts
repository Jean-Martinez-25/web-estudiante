import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const themes = [
  {
    background: "#1A1A2E",
    color: "#FFFFFF",
    primaryColor: "#0F3460"
  },
  {
    background: "#461220",
    color: "#FFFFFF",
    primaryColor: "#E94560"
  },
  {
    background: "#192A51",
    color: "#FFFFFF",
    primaryColor: "#967AA1"
  },
  {
    background: "#F7B267",
    color: "#000000",
    primaryColor: "#F4845F"
  },
  {
    background: "#1A1A2E",
    color: "#FFF",
    primaryColor: "#BB4430"
  },
  {
    background: "#F25F5C",
    color: "#000000",
    primaryColor: "#642B36"
  },
  {
    background: "#231F20",
    color: "#FFF",
    primaryColor: "#BB4430"
  }
];

const setTheme = (theme: any) => {
  const root = document.documentElement;
  root.style.setProperty('--background', theme.background);
  root.style.setProperty('--color', theme.color);
  root.style.setProperty('--primary-color', theme.primaryColor);
  // Add other theme properties if needed (e.g., --glass-color)
};

const displayThemeButtons = () => {
  const btnContainer = document.querySelector(".theme-btn-container");
  themes.forEach((theme) => {
    const div = document.createElement("div");
    div.className = "theme-btn";
    div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`;
    btnContainer!.appendChild(div);
    div.addEventListener("click", () => setTheme(theme));
  });
};


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  themes = themes; // Use themes directly
  constructor(private router: Router){}
  setTheme(theme: any) {
    setTheme(theme); // Use setTheme function directly
  }

  displayThemeButtons() {
    displayThemeButtons(); // Call displayThemeButtons function directly
  }

  ngOnInit() {
    this.displayThemeButtons();
  }
  inicio(){
    this.router.navigate(['/bases/inicio'])
  }
}
