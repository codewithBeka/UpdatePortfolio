// utils/detectLanguage.ts

export const detectLanguage = (code: string): string => {
    const languagePatterns: { [key: string]: RegExp } = {
      javascript: /(?:^|\s)(import|require|const|let|var|async|await|function|=>|class|console|return|if|else|try|catch|finally|for|while|switch)/,
      typescript: /(?:^|\s)(import|export|const|let|var|async|await|function|=>|class|interface|type|extends|implements|namespace)/,
      python: /^(def|class|import|from|print|if|elif|else|for|while|return|with|as)/, // Matches Python keywords
      html: /<\s*?[a-zA-Z][^>]*>/, // Matches opening HTML tags
      css: /[^{]+\s*{/,
      java: /\b(public|static|void|class|import|new)\b/,
      // Add more languages as needed
    };
  
    for (const [language, pattern] of Object.entries(languagePatterns)) {
      if (pattern.test(code)) {
        return language;
      }
    }
    return 'plaintext'; // Default language if none matched
  };
  
  
  export const decodeHtml = (html: string): string => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value.replace(/&nbsp;/g, ' '); // Convert &nbsp; to spaces if necessary
  };