import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { TrustBarComponent } from './components/trust-bar/trust-bar.component';
import { ServicesComponent } from './components/services/services.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { StatsComponent } from './components/stats/stats.component';
import { SupportComponent } from './components/support/support.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    TrustBarComponent,
    ServicesComponent,
    WhyUsComponent,
    StatsComponent,
    SupportComponent,
    OurTeamComponent,
    ContactComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './app.component.html',
})
export class AppComponent {}
