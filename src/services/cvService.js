import cvFile from '../assets/cv/cv.pdf';

export const getCVContent = async () => {
  try {
    console.log('Début de la lecture du CV...');
    
    // Créer un objet URL pour le fichier PDF
    const pdfUrl = URL.createObjectURL(cvFile);
    console.log('URL du PDF créée:', pdfUrl);
    
    // Utiliser pdf.js pour lire le PDF
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    // Charger le PDF
    console.log('Chargement du PDF...');
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    console.log('PDF chargé, nombre de pages:', pdf.numPages);

    // Extraire le texte de toutes les pages
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`Lecture de la page ${i}...`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
      console.log(`Page ${i} lue, longueur du texte:`, pageText.length);
    }

    // Nettoyer l'URL
    URL.revokeObjectURL(pdfUrl);
    console.log('URL nettoyée');

    // Structurer les informations
    const cvInfo = {
      fullText,
      sections: {
        education: extractSection(fullText, 'Education', 'Experience'),
        experience: extractSection(fullText, 'Experience', 'Skills'),
        skills: extractSection(fullText, 'Skills', 'Projects'),
        projects: extractSection(fullText, 'Projects', '')
      }
    };

    console.log('CV structuré avec succès');
    return cvInfo;
  } catch (error) {
    console.error('Erreur détaillée lors de la lecture du CV:', error);
    throw error;
  }
};

const extractSection = (text, startMarker, endMarker) => {
  console.log(`Extraction de la section ${startMarker}...`);
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) {
    console.log(`Section ${startMarker} non trouvée`);
    return '';
  }

  const endIndex = endMarker ? text.indexOf(endMarker, startIndex) : text.length;
  if (endIndex === -1) {
    console.log(`Fin de section ${startMarker} non trouvée, utilisation de la fin du texte`);
    return text.substring(startIndex);
  }

  const section = text.substring(startIndex, endIndex).trim();
  console.log(`Section ${startMarker} extraite, longueur:`, section.length);
  return section;
}; 