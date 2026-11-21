import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const sliderInputs = () => screen.getAllByRole('slider') as HTMLInputElement[];

describe('App', () => {
    beforeEach(() => localStorage.clear());
    afterEach(() => {
        cleanup();
        vi.useRealTimers();
    });

    it('renders the default recipe', () => {
        render(<App />);
        expect(screen.getByText('Prepare 20.0 g of coffee and rinse your filter.')).toBeInTheDocument();
        expect(screen.getByText('Pour water in 5 steps by:')).toBeInTheDocument();
        expect(screen.getByText('1:15.00')).toBeInTheDocument();
    });

    it('recalculates coffee when water changes and ratio is locked', () => {
        render(<App />);
        const [, water] = sliderInputs();
        fireEvent.change(water, { target: { value: 450 } });
        expect(screen.getByText('Prepare 30.0 g of coffee and rinse your filter.')).toBeInTheDocument();
    });

    it('restores a recipe saved in localStorage', () => {
        localStorage.setItem('recipe', JSON.stringify({ coffee: 15, water: 250, ratio: 250 / 15 }));
        render(<App />);
        expect(screen.getByText('Prepare 15.0 g of coffee and rinse your filter.')).toBeInTheDocument();
    });

    it('saves recipe changes to localStorage after debounce', () => {
        vi.useFakeTimers();
        render(<App />);
        const [, water] = sliderInputs();
        fireEvent.change(water, { target: { value: 600 } });
        act(() => vi.advanceTimersByTime(600));
        expect(JSON.parse(localStorage.getItem('recipe')!)).toMatchObject({ coffee: 40, water: 600 });
    });

    it('runs the timer after pressing Start', () => {
        vi.useFakeTimers();
        vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
        render(<App />);
        fireEvent.click(screen.getByRole('button', { name: 'Start' }));
        act(() => vi.advanceTimersByTime(3000));
        expect(screen.getByText('00:03')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    });
});
