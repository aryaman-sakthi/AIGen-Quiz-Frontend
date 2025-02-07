import { Injectable } from "@angular/core";

export interface QuizSong {
    path: string;
    isAI: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class SongQuizService {
    private songList: QuizSong[] = [
        { path: "assets/Songs/Song_Real_1.mp3", isAI: false },
        { path: "assets/Songs/Song_AI_1.mp3", isAI: true },
        { path: "assets/Songs/Song_AI_2.mp3", isAI: true },
        { path: "assets/Songs/Song_AI_3.mp3", isAI: true }
    ]; // Add more songs if needed

    private questionQueue: QuizSong[] = []; // Queue for songs questions

    initializeQuestions(): number {
        this.questionQueue = [...this.songList]; // copy all song data into the queue

        // Shuffle the questions
        this.questionQueue.sort(() => Math.random() - 0.5);

        return this.questionQueue.length;
    }

    getNextQuestion(): QuizSong | null {
        // No more questions left
        if (this.questionQueue.length === 0) {
            return null;
        }

        // Get the next song and remove it from the queue
        const song = this.questionQueue.shift();
        
        return song || null;
    }
}