import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface QuizText {
    desc: string;
    text: string;
    isAI: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class TextQuizService {
    private questionQueue: QuizText[] = [];

    constructor(private http: HttpClient){}

    initializeQuestions(): Promise<void> {
        return new Promise((resolve, reject) => {
          this.http.get<QuizText[]>('assets/Text/TextData.json').subscribe(
            data => {
              this.questionQueue = data;
              this.questionQueue.sort(() => Math.random() - 0.5);
              console.log(this.questionQueue);
              resolve();
            },
            error => {
              reject(error);
            }
          );
        });
    }

    getNextQuestion(): QuizText | null {
        console.log(this.questionQueue)
        // No more questions left
        if (this.questionQueue.length === 0) {
            return null;
        }

        // Get the next question and remove it from the queue
        const text = this.questionQueue.shift();
        
        return text || null;
    }


}