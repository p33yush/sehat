// Language Manager for Kerala Migrant Health Records
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.initializeLanguageSelector();
        this.loadSavedLanguage();
        this.setupStickyHeaderWatcher();
    }

    async loadTranslations() {
        const languages = ['en', 'hi', 'ml', 'ta'];
        
        for (const lang of languages) {
            try {
                const response = await fetch(`lang-${lang}.json`);
                this.translations[lang] = await response.json();
                console.log(`Loaded language: ${lang}`, this.translations[lang]);
            } catch (error) {
                console.error(`Failed to load language ${lang}`, error);
            }
        }
        
        console.log('All translations loaded:', this.translations);
    }

    initializeLanguageSelector() {
        const languageSelect = document.querySelector('.language-selector select');
        
        if (languageSelect) {
            console.log('Language selector found:', languageSelect);
            languageSelect.addEventListener('change', (e) => {
                console.log('Language selector changed to:', e.target.value);
                this.changeLanguage(e.target.value);
            });
        } else {
            console.warn('Language selector not found');
        }
    }

    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
        this.changeLanguage(savedLanguage);
        
        // Update the select dropdown
        const languageSelect = document.querySelector('.language-selector select');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
        }
    }

    changeLanguage(languageCode) {
        console.log('Changing language to:', languageCode);
        
        if (!this.translations[languageCode]) {
            console.error(`Language ${languageCode} not loaded`);
            return;
        }

        this.currentLanguage = languageCode;
        localStorage.setItem('selectedLanguage', languageCode);
        
        // Update the select dropdown to reflect the current language
        const languageSelect = document.querySelector('.language-selector select');
        if (languageSelect) {
            languageSelect.value = languageCode;
            console.log('Updated select dropdown to:', languageCode);
        }
        
        const translation = this.translations[languageCode];
        console.log('Translation data:', translation);
        this.updatePageContent(translation);
    }

    updatePageContent(translation) {
        // Update top header - preserve logo image
        const logoElement = document.querySelector('.top-header .logo-text');
        if (logoElement) {
            logoElement.innerHTML = `<img src="../assets/finallogo.png" alt="logo" />${translation.topHeader.title}`;
        }
        this.updateElement('.admin-btn', translation.topHeader.adminBtn);
        this.updateElement('.register-btn', translation.topHeader.registerBtn);

        // Update main header - preserve logo image and sticky positioning
        const mainLogoElement = document.querySelector('.main-header .logo-text');
        if (mainLogoElement) {
            // Preserve any existing classes and attributes
            const currentClasses = mainLogoElement.className;
            const currentStyle = mainLogoElement.getAttribute('style');
            
            mainLogoElement.innerHTML = `<img src="../assets/finallogo.png" alt="logo" />${translation.mainHeader.title}`;
            
            // Restore classes and styles to prevent CSS interference
            if (currentClasses) {
                mainLogoElement.className = currentClasses;
            }
            if (currentStyle) {
                mainLogoElement.setAttribute('style', currentStyle);
            }
        }
        this.updateElement('.main-nav a[href="#about"]', translation.mainHeader.nav.about);
        this.updateElement('.main-nav a[href="#prevention"]', translation.mainHeader.nav.prevention);
        this.updateElement('.main-nav a[href="#resources"]', translation.mainHeader.nav.resources);
        this.updateElement('.main-nav a[href="#support"]', translation.mainHeader.nav.support);

        // Update hero section
        this.updateElement('.hero-section h1', translation.hero.title);
        this.updateElement('.achievement-badge span', translation.hero.badge);
        this.updateElement('.pm-quote', translation.hero.quote);
        this.updateElement('.pm-quote cite', translation.hero.quoteAuthor);

        // Update steps section
        this.updateElement('.vaccination-steps h2', translation.steps.title);
        this.updateStepCard(1, translation.steps.step1);
        this.updateStepCard(2, translation.steps.step2);
        this.updateStepCard(3, translation.steps.step3);

        // Update search section
        this.updateElement('.search-centers h2', translation.search.title);
        this.updateElement('.tab-btn[data-tab="district"]', translation.search.tabs.district);
        this.updateElement('.tab-btn[data-tab="pin"]', translation.search.tabs.pin);
        this.updateSearchForm(translation.search.form);

        // Update sections
        this.updateSections(translation.sections);

        // Update FAQ
        this.updateFAQ(translation.faq);

        // Update Latest Updates section
        this.updateLatestUpdates(translation.sections.latestUpdates);

        // Update Partners section
        this.updatePartners(translation.sections.partners);

        // Update footer
        this.updateFooter(translation.footer);
        
        // Ensure sticky header CSS is maintained after language change
        this.ensureStickyHeader();
        
        // Re-initialize card buttons after language change
        this.reinitializeCardButtons();
    }
    
    ensureStickyHeader() {
        // Re-apply sticky positioning to main header after language change
        const mainHeader = document.querySelector('.main-header');
        if (mainHeader) {
            // Force re-application of sticky positioning
            mainHeader.style.position = 'sticky';
            mainHeader.style.top = '0';
            mainHeader.style.zIndex = '100';
            console.log('Re-applied sticky header positioning');
        }
    }
    
    setupStickyHeaderWatcher() {
        // Watch for changes to the main header and ensure sticky positioning is maintained
        const mainHeader = document.querySelector('.main-header');
        if (mainHeader) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'attributes') {
                        // Re-apply sticky positioning if header was modified
                        setTimeout(() => {
                            this.ensureStickyHeader();
                        }, 100);
                    }
                });
            });
            
            observer.observe(mainHeader, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
            
            console.log('Sticky header watcher set up');
        }
    }
    
    reinitializeCardButtons() {
        // Re-initialize card buttons after language change
        console.log('Re-initializing card buttons after language change...');
        
        // Remove existing event listeners by cloning and replacing buttons
        const allButtons = document.querySelectorAll('.step-card .btn-primary');
        allButtons.forEach((button, index) => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add event listeners to the new button
            if (index === 0) {
                newButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Register button clicked (re-initialized)');
                    alert('Register button clicked!');
                    window.location.href = '../login/login.html';
                });
            } else if (index === 1) {
                newButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Download button clicked (re-initialized)');
                    alert('Download button clicked!');
                    if (window.showAppDownloadModal) {
                        window.showAppDownloadModal();
                    }
                });
            } else if (index === 2) {
                newButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Alerts button clicked (re-initialized)');
                    alert('Alerts button clicked!');
                    if (window.showHealthAlertsModal) {
                        window.showHealthAlertsModal();
                    }
                });
            }
        });
        
        console.log('Card buttons re-initialized');
    }

    updateElement(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
            console.log(`Updated element ${selector} with text: ${text}`);
        } else {
            console.warn(`Element not found: ${selector}`);
        }
    }

    updateStepCard(stepNumber, stepData) {
        const stepCard = document.querySelector(`.step-card:nth-child(${stepNumber})`);
        if (stepCard) {
            this.updateElement(`.step-card:nth-child(${stepNumber}) h3`, stepData.title);
            this.updateElement(`.step-card:nth-child(${stepNumber}) p`, stepData.description);
            this.updateElement(`.step-card:nth-child(${stepNumber}) .btn`, stepData.button);
        }
    }

    updateSearchForm(formData) {
        // Update labels
        this.updateElement('#district .form-group:first-child label', formData.districtLabel);
        this.updateElement('#district .form-group:nth-child(2) label', formData.serviceLabel);
        this.updateElement('#pin .form-group:first-child label', formData.pinLabel);
        this.updateElement('#pin .form-group:nth-child(2) label', formData.serviceLabel);
        
        // Update placeholders
        this.updateElement('#pinCode', formData.pinPlaceholder);
        
        // Update buttons
        this.updateElement('#district .btn', formData.searchBtn);
        this.updateElement('#searchByPin', formData.searchBtn);
        
        // Update district options
        this.updateSelectOptions('#district select:first-child', formData.districts);
        this.updateSelectOptions('#district select:nth-child(2)', formData.services);
        this.updateSelectOptions('#pin select', formData.services);
    }

    updateSelectOptions(selector, options) {
        const select = document.querySelector(selector);
        if (select) {
            select.innerHTML = '';
            Object.entries(options).forEach(([key, value]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = value;
                select.appendChild(option);
            });
        }
    }

    updateSections(sections) {
        // Health Checkup
        this.updateElement('.precaution-dose h2', sections.healthCheckup.title);
        this.updateElement('.precaution-dose p', sections.healthCheckup.description);

        // Report Issues
        this.updateElement('.side-effects h2', sections.reportIssues.title);
        this.updateElement('.side-effects p', sections.reportIssues.description);

        // Analytics
        this.updateElement('.children-vaccination h2', sections.analytics.title);
        this.updateElement('.children-vaccination p', sections.analytics.description);

        // Update Records
        this.updateElement('.date-correction h2', sections.updateRecords.title);
        this.updateElement('.date-correction p', sections.updateRecords.description);

        // Disease Prevention
        this.updateElement('.precaution-details h2', sections.diseasePrevention.title);
        this.updateElement('.precaution-details p:first-of-type', sections.diseasePrevention.description);
        this.updateElement('.precaution-details p:last-of-type', sections.diseasePrevention.features);

        // SDG
        this.updateElement('.abha-section h2', sections.sdg.title);
        this.updateElement('.abha-section p', sections.sdg.description);
        this.updateElement('#sdgImpactBtn', sections.sdg.button);

        // Support Services
        this.updateElement('.raise-issue h2', sections.supportServices.title);
        this.updateSupportServices(sections.supportServices.services);

        // Statistics
        this.updateElement('.statistics-left h2', sections.statistics.title);
        this.updateStatistics(sections.statistics.stats);

        // Partners
        this.updateElement('.partners h2', sections.partners.title);
    }

    updateSupportServices(services) {
        const serviceCards = document.querySelectorAll('.issue-card');
        const serviceTitles = Object.values(services);
        
        serviceCards.forEach((card, index) => {
            if (serviceTitles[index]) {
                this.updateElement(`.issue-card:nth-child(${index + 1}) h3`, serviceTitles[index]);
            }
        });
    }

    updateStatistics(stats) {
        this.updateElement('.stat-item:nth-child(1) h3', stats.registered);
        this.updateElement('.stat-item:nth-child(2) h3', stats.centers);
        this.updateElement('.stat-item:nth-child(3) h3', stats.emergency);
        this.updateElement('.stat-item:nth-child(4) h3', stats.prevention);
    }

    updateFAQ(faq) {
        this.updateElement('.faq-right h2', faq.title);
        this.updateElement('.faq-tab:nth-child(1)', faq.tabs.general);
        this.updateElement('.faq-tab:nth-child(2)', faq.tabs.registration);
        this.updateElement('.faq-tab:nth-child(3)', faq.tabs.healthServices);
        this.updateElement('.faq-tab:nth-child(4)', faq.tabs.emergency);
    }

    updateLatestUpdates(latestUpdates) {
        this.updateElement('.whats-new h2', latestUpdates.title);
        
        // Update feature items
        const featureItems = document.querySelectorAll('.feature-item');
        const features = Object.values(latestUpdates.features);
        
        featureItems.forEach((item, index) => {
            if (features[index]) {
                const p = item.querySelector('p');
                if (p) {
                    p.textContent = features[index];
                }
            }
        });
    }

    updatePartners(partners) {
        this.updateElement('.partners h2', partners.title);
        
        // Update partner organization names
        const partnerLinks = document.querySelectorAll('.partner-logo');
        const organizations = Object.values(partners.organizations);
        
        partnerLinks.forEach((link, index) => {
            if (organizations[index]) {
                link.textContent = organizations[index];
            }
        });
    }

    updateFooter(footer) {
        this.updateElement('.footer-section:nth-child(1) h3', footer.platforms);
        this.updateElement('.footer-section:nth-child(2) h3', footer.support);
        this.updateElement('.footer-section:nth-child(3) h3', footer.legal);
        
        // Update footer links
        this.updateFooterLinks(footer.links);
    }

    updateFooterLinks(links) {
        const linkTexts = Object.values(links);
        const footerLinks = document.querySelectorAll('.footer-section a');
        
        footerLinks.forEach((link, index) => {
            if (linkTexts[index]) {
                link.textContent = linkTexts[index];
            }
        });
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.languageManager = new LanguageManager();
});
