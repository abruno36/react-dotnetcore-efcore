import React from 'react';

interface TitlePageProps {
    title: string;
    children?: React.ReactNode;
}

const TitlePage: React.FC<TitlePageProps> = (
    { title, children }: TitlePageProps
) => {
    return (
        <div className='d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1'>
            <h1 className='m-0 p-0'>{title}</h1>
            {children}
        </div>
    );
}

export default TitlePage;
