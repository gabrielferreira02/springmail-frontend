import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {

  openWriteMessageBox() {
    const writeMessageBox = document.getElementById("writeMessageBox");
    writeMessageBox?.classList.remove("hidden");
    writeMessageBox?.classList.add("flex");
  }

  closeWriteMessageBox() {
    const writeMessageBox = document.getElementById("writeMessageBox");
    writeMessageBox?.classList.remove("flex");
    writeMessageBox?.classList.add("hidden");
  }
}
