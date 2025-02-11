import { writable } from 'svelte/store';

export const INITIAL_COUNTDOWN = 15;

export interface Candidate {
    name: string;
    phone: string;
    email: string;
    countdown: number;
    challengeStarted: boolean;
    showCandidatePage: boolean;
    previousCountdown: number;
    showPreviousCountdown: boolean;
}

export const candidateStore = writable<Candidate>({
    name: '',
    phone: '',
    email: '',
    countdown: 15,
    challengeStarted: false,
    showCandidatePage: false,
    previousCountdown: 15,
    showPreviousCountdown: false
});