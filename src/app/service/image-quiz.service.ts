// Service for Image Quiz
import { Injectable } from "@angular/core";

export interface QuizImage {
    path: string;
    isAI: boolean;
    highlighted?: boolean; // Optional property to highlight correct image
}

@Injectable({
    providedIn: 'root'
})
export class ImageQuizService {
    // Predifined list of categories 
    private categories: string[] = ['Animal','Beach','Building','Car','Flower',
                                    'Food','Jet','Lake','Mountain','Painting',
                                    'Shrine','Sky','Tree','Volcano','Waterfall']; // Add more if you want more questions
    
    private questionQueue: string[] = [];  //Queue questions

    initializeQuestions() {
        // Shuffle categories
        const shuffledCategories = [...this.categories].sort(() => Math.random() - 0.5);
    
        // Select only 10 unique categories
        this.questionQueue = shuffledCategories.slice(0, 10);
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