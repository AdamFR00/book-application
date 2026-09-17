import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: "app-root",
  styles: [],
  template: `
    <div class="app-layout">
      <app-header />
      <main class="app-content">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class App {}
