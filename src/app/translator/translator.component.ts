import { Component } from '@angular/core';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent {
  input: string = ""
  output: string = ""
  label: string = "Deutsch"
  label2: string = "Topf"
  reverse: boolean = false
  timeLeft: number = 0
  interval: ReturnType<typeof setInterval> | undefined
  lastInput: string = ""
  showOthers: boolean = false
  sound: boolean = false

  change(): void {
    this.reverse = !this.reverse
    this.label = this.reverse ? "Topf" : "Deutsch"
    this.label2 = this.reverse ? "Deutsch" : "Topf"
    this.lastInput = this.input
    this.input = this.output
    this.output = "..."
    this.typing()

  }

  playSound(): void {
    let audio = new Audio();
    audio.src = "https://quicksounds.com/uploads/tracks/571186210_1916617881_2061640793.mp3";
    audio.load();
    audio.play();
  }

  typing(): void {
    this.showOthers = false
    this.output = "..."
    this.sound = false
    this.timeLeft = 1
    if (this.interval !== undefined) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval)
        if (!this.reverse) {

          this.output = "*Topf Geräusche*"
          this.sound = true
        }
        else {
          console.log(this.lastInput)
          if (this.input === "*Topf Geräusche*") {
            this.showOthers = true
            this.output = this.lastInput
          }
          else {
            this.output = "--no translation possible--"
          }
        }

      }
    }, 500)
  }

}
