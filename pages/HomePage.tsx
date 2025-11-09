// Fix: Implemented the missing HomePage.
import React from 'react';
import DashboardPage from './DashboardPage';
import type { Page } from '../types';

interface HomePageProps {
    setCurrentPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
    return <DashboardPage setCurrentPage={setCurrentPage} />
};

export default HomePage;
