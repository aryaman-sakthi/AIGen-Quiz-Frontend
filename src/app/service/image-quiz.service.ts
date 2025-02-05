// Service for Image Quiz
import { Injectable } from "@angular/core";

export interface QuizImage {
    path: string;
    isAI: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ImageQuizService {
    // Predifined list of categories 
    private categories: string[] = ['Animal','Building','Car','Flower',
                                    'Food','Lake','Mountain','Painting',
                                    'Sky','Tree']; // Add more if you want more questions
    
    private questionQueue: string[] = [];  //Queue questions

    initializeQuestions() {
        this.questionQueue = [...this.categories]; // copy categories into question queue

        // Shuffle the questions 
        this.questionQueue.sort(() => Math.random() - 0.5);
    }

    getNextQuestion(): QuizImage[] | null{
        // No more questions left
        if (this.questionQueue.length === 0){
            return null; 
        } 

        const category: string = this.questionQueue[0];
        const image: QuizImage[] = this.getImagesForCategory(category);
        
        // Remove the question from the queue
        this.questionQueue.shift();

        // Return the question
        return image;
    }

    //Returns images for a given category
    getImagesForCategory(category: string): QuizImage[] {
        //Build List of Image Objects
        const images: QuizImage[] = [
            { path: `assets/Images/${category}s/${category}_1.jpg`, isAI: false },
            { path: `assets/Images/${category}s/${category}_2.jpg`, isAI: false },
            { path: `assets/Images/${category}s/${category}_3.jpg`, isAI: false },
            { path: `assets/Images/${category}s/${category}_AI.jpg`, isAI: true }  
        ];

        //Shuffle the array
        return images.sort(() => Math.random() - 0.5);
    }
}