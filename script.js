
document.addEventListener('DOMContentLoaded', () => {
    const form           = document.getElementById('dataForm');
    const transcriptInput = document.getElementById('transcript');
    const majorReqInput  = document.getElementById('majorReq');
    const careerInput    = document.getElementById('career');
    const downloadBtn    = document.getElementById('downloadBtn');
    const downloadSection= document.getElementById('downloadSection');
    const status         = document.getElementById('status');

    const pdfPreviewContainer       = document.getElementById('pdfPreviewContainer');
    const pdfPreview                = document.getElementById('pdfPreview');
    const majorReqPreviewContainer  = document.getElementById('majorReqPreviewContainer');
    const majorReqPreview           = document.getElementById('majorReqPreview');

    function setStatus(msg, type = 'info') {
        status.textContent = msg;
        status.style.color =
            type === 'error'   ? 'red' :
                type === 'success' ? 'green' :
                    'black';
    }

    // Transcript preview
    transcriptInput.addEventListener('change', () => {
        const file = transcriptInput.files[0];
        if (!file || file.type !== 'application/pdf') {
            setStatus('Please upload a valid PDF for transcript.', 'error');
            pdfPreviewContainer.style.display = 'none';
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            pdfPreview.src = reader.result;
            pdfPreviewContainer.style.display = 'block';
            setStatus('Transcript preview loaded.', 'success');
        };
        reader.onerror = () => {
            setStatus('Error loading transcript preview.', 'error');
            pdfPreviewContainer.style.display = 'none';
        };
        reader.readAsDataURL(file);
    });

    // Major requirements preview
    majorReqInput.addEventListener('change', () => {
        const file = majorReqInput.files[0];
        if (!file || file.type !== 'application/pdf') {
            setStatus('Please upload a valid PDF for major requirements.', 'error');
            majorReqPreviewContainer.style.display = 'none';
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            majorReqPreview.src = reader.result;
            majorReqPreviewContainer.style.display = 'block';
            setStatus('Major requirements preview loaded.', 'success');
        };
        reader.onerror = () => {
            setStatus('Error loading major preview.', 'error');
            majorReqPreviewContainer.style.display = 'none';
        };
        reader.readAsDataURL(file);
    });

    // Save to localStorage
    form.addEventListener('submit', e => {
        e.preventDefault();
        const transcriptFile = transcriptInput.files[0];
        const majorReqFile   = majorReqInput.files[0];
        const careerText     = careerInput.value.trim();

        if (!transcriptFile || !majorReqFile || !careerText) {
            setStatus('All three fields are required.', 'error');
            return;
        }

        // Read transcript then major
        const tReader = new FileReader();
        tReader.onload = () => {
            const mReader = new FileReader();
            mReader.onload = () => {
                const data = {
                    transcript: tReader.result,
                    majorReq:   mReader.result,
                    career:     careerText
                };
                localStorage.setItem('userData', JSON.stringify(data));
                setStatus('Data saved successfully!', 'success');
                downloadSection.style.display = 'block';
            };
            mReader.onerror = () => setStatus('Failed to read major requirements.', 'error');
            mReader.readAsDataURL(majorReqFile);
        };
        tReader.onerror = () => setStatus('Failed to read transcript.', 'error');
        tReader.readAsDataURL(transcriptFile);
    });

    // Download all three files
    downloadBtn.addEventListener('click', () => {
        const saved = localStorage.getItem('userData');
        if (!saved) {
            setStatus('No saved data found.', 'error');
            return;
        }

        const { transcript, majorReq, career } = JSON.parse(saved);

        // Helper to download a dataURL as PDF
        function downloadPdf(dataUrl, filename) {
            fetch(dataUrl)
                .then(res => res.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                })
                .catch(() => setStatus(`Error downloading ${filename}`, 'error'));
        }

        // 1) Transcript PDF
        downloadPdf(transcript, 'transcript.pdf');

        // 2) Major requirements PDF
        downloadPdf(majorReq, 'major_requirements.pdf');

        // 3) Career interests .txt
        const txtBlob = new Blob([career], { type: 'text/plain;charset=utf-8' });
        const txtUrl  = URL.createObjectURL(txtBlob);
        const b = document.createElement('a');
        b.href        = txtUrl;
        b.download    = 'career_interests.txt';
        document.body.appendChild(b);
        b.click();
        b.remove();
        URL.revokeObjectURL(txtUrl);

        setStatus('Downloads started.', 'success');
    });
});
