import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';

const downloadFilename = 'brunopc_cv.pdf';

const Resume = ({ data, theme: Theme, lang }) => {
    const meta = {
        title: `CV, ${data.basics.name}`,
        description: `${data.basics.name}, ${data.basics.title[lang]}, ${data.basics.label[lang]}`
    }
    const [pdf, setPdf] = useState(null);

    useEffect(() => {
        // If pdf exists, setting the pdf file url to pass to the Theme
        const pdfFile = `/resume-${lang}.pdf`;
        fetch(`.${pdfFile}`).then((response) => response.ok &&
            setPdf({ fileUrl: '/Reactsume'+pdfFile, fileName: downloadFilename })
        )
    }, []);

    return (
        <DocumentMeta {...meta}>
            <Theme resumeData={data} lang={lang} pdf={pdf} />
        </DocumentMeta>
    );
};

const Reactsume = ({data, theme}) => {
    const [redirectedLang, setRedirectedLang] = useState(null);

    useEffect(() => {
        // Determine the user's preferred language
        const browserLang = (navigator.language || navigator.userLanguage).substring(0, 2);
        // If browser lang exist in resume, this will be the default language
        setRedirectedLang(data.basics.label[browserLang] ? browserLang : 'en');
    }, []);

    return redirectedLang && (
        <Routes>
            <Route path="/" element={<Navigate to={`/${redirectedLang}`} replace />} />
            {Object.keys(data.basics.label).map( lang =>
                <Route key={lang} path={`/${lang}`} element={<Resume data={data} theme={theme} lang={lang} />} />
            )}
        </Routes>
    );
};

export default Reactsume;
