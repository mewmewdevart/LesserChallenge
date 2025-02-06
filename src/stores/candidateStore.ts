import { writable } from 'svelte/store';

interface CandidateState {
    name: string;
    phone: string;
    email: string;
    countdown: number;
    challengeStarted: boolean;
    showCandidatePage: boolean;
}

export const candidateStore = writable<CandidateState>({
    name: '',
    phone: '',
    email: '',
    countdown: 15,
    challengeStarted: false,
    showCandidatePage: false,
});