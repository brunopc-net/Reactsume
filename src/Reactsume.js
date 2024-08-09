import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import DocumentMeta from 'react-document-meta';

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
            setPdf({ fileUrl: pdfFile, fileName: 'brunopc_cv.pdf' })
        )
    }, []);

    return (
        <DocumentMeta {...meta}>
            <Theme resumeData={data} lang={lang} pdf={pdf} />
        </DocumentMeta>
    );
};

const Reactsume = ({resumeData, theme}) => {
    const [initialRoute, setInitialRoute] = useState(null);

    useEffect(() => {
        // Determine the user's preferred language
        const userLang = navigator.language || navigator.userLanguage;
        const lang = userLang.startsWith('fr') ? 'fr' : 'en';
        setInitialRoute(`/${lang}`);
    }, []);

    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/" element={<Navigate to={initialRoute} replace />} />
                    <Route path="/fr" element={<Resume data={resumeData} theme={theme} lang="fr" />} />
                    <Route path="/en" element={<Resume data={resumeData} theme={theme} lang="en" />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default Reactsume;
