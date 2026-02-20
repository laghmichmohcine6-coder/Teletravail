// =============================================================
// i18n.js — Complete Bilingual System (EN / FR)
// Teletravail — Language Switch with localStorage Persistence
// =============================================================

const i18n = {

    currentLang: localStorage.getItem('language') || 'en',

    translations: {
        en: {
            // ── Navigation ────────────────────────────────────
            nav_home: 'Home',
            nav_jobs: 'Jobs',
            nav_about: 'About',
            nav_contact: 'Contact',
            nav_for_companies: 'For Companies',
            nav_login: 'Login',
            nav_join: 'Join Now',

            // ── Index – Hero ──────────────────────────────────
            hero_title: 'Work Without',
            hero_title_highlight: 'Borders',
            hero_subtitle: 'Connect with world-class remote opportunities. Build your career from anywhere. Join the future of work.',
            hero_find_jobs: 'Find Remote Jobs',
            hero_post_job: 'Post a Job',

            // ── Index – How It Works ──────────────────────────
            how_it_works_title: 'How It',
            how_it_works_highlight: 'Works',
            how_it_works_subtitle: 'Three simple steps to your dream remote career',
            step1_title: 'Create Your Profile',
            step1_desc: 'Build a professional profile showcasing your skills and experience',
            step2_title: 'Browse Opportunities',
            step2_desc: 'Explore thousands of remote positions from top companies worldwide',
            step3_title: 'Get Hired',
            step3_desc: 'Apply with one click and start your remote career journey',

            // ── Index – Stats ─────────────────────────────────
            stats_title: 'Platform',
            stats_highlight: 'Statistics',
            stats_jobs: 'Total Jobs',
            stats_companies: 'Companies',
            stats_applications: 'Applications',
            stats_users: 'Active Users',

            // ── Index – For Companies ─────────────────────────
            companies_title: 'For Companies',
            companies_subtitle: 'Find and hire top remote talent from around the world',
            companies_talent_title: 'Access Top Talent',
            companies_talent_desc: 'Connect with skilled professionals from around the globe ready to work remotely.',
            companies_hiring_title: 'Quick Hiring',
            companies_hiring_desc: 'Post jobs in minutes and start receiving applications from qualified candidates.',
            companies_grow_title: 'Grow Your Team',
            companies_grow_desc: 'Build a world-class remote team without geographical limitations.',
            companies_btn: 'Hire Talent',

            // ── Index – Team ──────────────────────────────────
            team_title: 'Meet The',
            team_highlight: 'Team',
            team_subtitle: 'Passionate professionals dedicated to connecting talent with opportunity',
            role_founder: 'Founder & CEO',
            role_coo: 'Chief Operations Officer',
            role_strategy: 'Global Strategy Team',
            role_remote: 'Remote Innovation',
            role_connecting: 'Connecting Continents',
            role_future: 'Building the Future',

            // ── Footer ────────────────────────────────────────
            footer_tagline: 'Connecting talent with remote opportunities worldwide',
            footer_quick_links: 'Quick Links',
            footer_for_companies: 'For Companies',
            footer_resources: 'Resources',
            footer_rights: 'All rights reserved.',

            // ── Jobs Page ─────────────────────────────────────
            jobs_hero_title: 'Elite Remote Opportunities',
            jobs_hero_subtitle: 'Discover world-class positions from top companies. Your dream remote career starts here.',
            jobs_filter_all_cats: 'All Categories',
            jobs_filter_all_types: 'All Types',
            filter_cat_development: 'Development',
            filter_cat_design: 'Design',
            filter_cat_marketing: 'Marketing',
            filter_cat_management: 'Management',
            filter_cat_sales: 'Sales',
            filter_cat_support: 'Support',
            filter_type_fulltime: 'Full-time',
            filter_type_parttime: 'Part-time',
            filter_type_contract: 'Contract',
            filter_type_freelance: 'Freelance',
            jobs_found: 'jobs found',
            jobs_all: 'All Categories',
            jobs_apply: 'Apply Now',
            apply_now: 'Apply Now',
            jobs_view_all: 'View All Jobs',
            jobs_title: 'Remote',
            jobs_highlight: 'Opportunities',
            jobs_subtitle: 'Discover your next career move',

            // ── Job Details Page ──────────────────────────────
            back_to_jobs: 'Back to Jobs',
            about_role: 'About the Role',
            responsibilities: 'Responsibilities',
            requirements: 'Requirements',
            benefits_title: 'Benefits',
            save_job: 'Save Job',
            label_salary: 'Salary',
            label_posted: 'Posted',
            label_experience: 'Experience',
            share_job: 'Share this job:',
            job_not_found: 'Job Not Found',
            job_not_found_desc: 'The job you are looking for does not exist.',
            btn_browse: 'Browse Jobs',
            modal_apply_for: 'Apply for',
            modal_at: 'at',
            form_full_name: 'Full Name',
            form_email_addr: 'Email Address',
            form_resume: 'Resume / CV Link',
            form_cover_letter: 'Cover Letter',
            btn_submit: 'Submit Application',

            // ── About Page ────────────────────────────────────
            about_hero_title: 'Redefining',
            about_hero_highlight: 'Remote Work',
            about_hero_subtitle: "We're on a mission to connect talented professionals with exceptional remote opportunities worldwide.",
            about_mission_title: 'Our Mission',
            about_mission_p1: "At Télétravail, we believe that talent knows no boundaries. Our platform bridges the gap between exceptional professionals and forward-thinking companies, enabling meaningful connections that transcend geographical limitations.",
            about_mission_p2: "We're committed to creating a world where work is defined by impact, not location. Through cutting-edge technology and personalized service, we empower individuals to build fulfilling careers while maintaining the flexibility to work from anywhere.",
            about_values_title: 'Our',
            about_values_highlight: 'Values',
            about_values_subtitle: 'The principles that guide everything we do',
            val_people: 'People First',
            val_people_desc: 'We prioritize the success and well-being of both professionals and employers in our community.',
            val_innovation: 'Innovation',
            val_innovation_desc: 'We continuously evolve our platform to meet the changing needs of the modern workforce.',
            val_trust: 'Trust',
            val_trust_desc: 'We maintain the highest standards of integrity and transparency in all our interactions.',
            about_cta_title: 'Ready to Start Your Remote Journey?',
            about_cta_subtitle: 'Join thousands of professionals who have found their dream remote positions through Télétravail.',
            btn_get_started: 'Get Started',
            btn_browse_jobs: 'Browse Jobs',

            // ── Contact Page ──────────────────────────────────
            contact_hero_title: 'Get In',
            contact_hero_highlight: 'Touch',
            contact_hero_subtitle: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
            send_message: 'Send us a message',
            form_name: 'Your Name',
            form_email: 'Email Address',
            form_subject: 'Subject',
            form_message: 'Message',
            btn_send: 'Send Message',
            contact_info: 'Contact Information',
            contact_email: 'Email',
            contact_phone: 'Phone',
            contact_office: 'Office',
            follow_us: 'Follow Us',
            faq_title: 'Frequently Asked',
            faq_highlight: 'Questions',
            faq_subtitle: 'Quick answers to common questions',
            faq_q1: 'How do I create an account?',
            faq_a1: 'Simply click on "Join Now" and fill out the registration form. It takes less than 2 minutes to get started.',
            faq_q2: 'Is Télétravail free to use?',
            faq_a2: 'Yes! Creating an account and browsing jobs is completely free for professionals. We only charge companies for posting positions.',
            faq_q3: 'How long does it take to hear back from companies?',
            faq_a3: 'Response times vary by company, but most employers review applications within 5-7 business days.',
            faq_q4: 'Can I apply to multiple positions?',
            faq_a4: 'Absolutely! You can apply to as many positions as you like. We recommend tailoring your application for each role.',

            // ── Common ────────────────────────────────────────
            full_remote: 'Full Remote',
            hybrid: 'Hybrid',
            full_time: 'Full-time',
            part_time: 'Part-time',
            contract: 'Contract',
            filter_search_placeholder: 'Search for jobs...',
            filter_location: 'Location',
            filter_category: 'Category',
            filter_type: 'Type',

            // ── Company Dashboard Sidebar ─────────────────────
            nav_overview: 'Overview',
            nav_post_job: 'Post Job',
            nav_manage_jobs: 'Manage Jobs',
            nav_company_profile: 'Company Profile',
            nav_logout: 'Logout',
            search_placeholder: 'Search...',

            // ── Company Dashboard – Main ──────────────────────
            company_dash_title: 'Company Dashboard',
            company_dash_subtitle: 'Manage your job postings and applicants',
            total_jobs: 'Total Jobs',
            active_postings: 'Active postings',
            total_applications: 'Total Applications',
            candidates: 'Candidates',
            active_jobs: 'Active Jobs',
            currently_hiring: 'Currently hiring',
            recent_postings: 'Recent Job Postings',
            view_all: 'View All',
            recent_applications: 'Recent Applications',
            table_applicant: 'Applicant',
            table_position: 'Position',
            table_applied_date: 'Applied Date',
            table_status: 'Status',

            // ── Post Job Page ─────────────────────────────────
            post_job_title: 'Post a Job',
            post_job_subtitle: 'Find the perfect candidate for your team',
            edit_job_title: 'Edit Job',
            form_job_title: 'Job Title *',
            form_job_type: 'Job Type *',
            form_location: 'Location *',
            form_salary: 'Salary Range',
            form_job_desc: 'Job Description *',
            form_requirements: 'Requirements *',
            form_benefits: 'Benefits (Optional)',
            form_status: 'Status *',
            type_full_time: 'Full-time',
            type_part_time: 'Part-time',
            type_contract: 'Contract',
            type_freelance: 'Freelance',
            loc_remote: 'Remote',
            loc_hybrid: 'Hybrid',
            loc_onsite: 'On-site',
            status_active: 'Active',
            status_draft: 'Draft',
            btn_cancel: 'Cancel',
            btn_post_job: 'Post Job',
            btn_update_job: 'Update Job',
            btn_post_new_job: 'Post New Job',

            // ── Manage Jobs Page ──────────────────────────────
            manage_jobs_title: 'Manage Jobs',
            manage_jobs_subtitle: 'View and manage all your job postings',

            // ── Company Profile Page ──────────────────────────
            company_profile_title: 'Company Profile',
            company_profile_subtitle: 'Manage your company information',
            form_company_name: 'Company Name *',
            form_company_email: 'Company Email *',
            form_website: 'Website',
            form_description: 'Company Description',
            btn_update_profile: 'Update Profile',

            // ── Applicants Page ───────────────────────────────
            manage_applicants_title: 'Manage Applicants',
            manage_applicants_subtitle: 'Review and manage job applications',
            btn_back_jobs: 'Back to Jobs',

            // ── User Dashboard Sidebar ──────────────────────────
            nav_profile: 'Profile',
            nav_applications: 'My Applications',
            nav_remote_jobs: 'Remote Jobs',

            // ── User Dashboard – Overview ─────────────────────
            dash_welcome: 'Your Remote Career Hub Starts Here',
            dash_welcome_sub: "Here's what's happening with your remote job search",
            stat_total_apps: 'Total Applications',
            stat_saved: 'Saved Jobs',
            stat_messages: 'Messages',
            stat_profile_views: 'Profile Views',
            my_applications: 'My Applications',
            dash_pos: 'Position',
            dash_company: 'Company',
            dash_applied: 'Applied Date',
            dash_status: 'Status',

            // ── Applications Page ─────────────────────────────
            apps_subtitle: 'Track your job applications and their status',
            no_apps_title: "You haven't applied to any jobs yet.",
            no_apps_desc: 'Start exploring remote opportunities today and take the next step in your career journey.',
            browse_jobs: 'Browse Remote Jobs',
            filter_all_status: 'All Status',
            status_pending: 'Pending',
            status_interview: 'Interview',
            status_accepted: 'Accepted',
            status_rejected: 'Rejected',
            sort_recent: 'Most Recent',
            sort_oldest: 'Oldest First',
            sort_company: 'Company A-Z',
            applications: 'applications',
            view_details: 'View Details',

            // ── Dashboard Jobs Page ───────────────────────────
            dash_jobs_title: 'Remote Job Opportunities',
            dash_jobs_subtitle: 'Discover your next career move from our curated selection',
            filter_all_categories: 'All Categories',
            cat_development: 'Development',
            cat_design: 'Design',
            cat_marketing: 'Marketing',
            cat_management: 'Management',
            cat_sales: 'Sales',
            cat_support: 'Support',
            filter_all_types: 'All Types',

            // ── Profile Page ────────────────────────────────
            profile_settings: 'Profile Settings',
            profile_subtitle: 'Manage your personal information and preferences',
            change_photo: 'Change Photo',
            personal_info: 'Personal Information',
            prof_info: 'Professional Information',
            form_name: 'Full Name',
            form_email: 'Email Address',
            form_phone: 'Phone Number',
            form_remote_pref: 'Remote Work Preference',
            form_skills: 'Skills (comma separated)',
            form_about: 'About Me',
            btn_save_changes: 'Save Changes'
        },

        fr: {
            // ── Navigation ────────────────────────────────────
            nav_home: 'Accueil',
            nav_jobs: 'Emplois',
            nav_about: 'À Propos',
            nav_contact: 'Contact',
            nav_for_companies: 'Pour Entreprises',
            nav_login: 'Connexion',
            nav_join: 'Rejoindre',

            // ── Index – Hero ──────────────────────────────────
            hero_title: 'Travaillez Sans',
            hero_title_highlight: 'Frontières',
            hero_subtitle: "Connectez-vous avec des opportunités de télétravail de classe mondiale. Construisez votre carrière de n'importe où. Rejoignez l'avenir du travail.",
            hero_find_jobs: 'Trouver des Emplois',
            hero_post_job: 'Publier une Offre',

            // ── Index – How It Works ──────────────────────────
            how_it_works_title: 'Comment Ça',
            how_it_works_highlight: 'Fonctionne',
            how_it_works_subtitle: 'Trois étapes simples vers votre carrière de rêve en télétravail',
            step1_title: 'Créez Votre Profil',
            step1_desc: 'Construisez un profil professionnel mettant en valeur vos compétences et expérience',
            step2_title: 'Parcourez les Opportunités',
            step2_desc: 'Explorez des milliers de postes à distance des meilleures entreprises du monde',
            step3_title: 'Soyez Embauché',
            step3_desc: 'Postulez en un clic et commencez votre parcours professionnel à distance',

            // ── Index – Stats ─────────────────────────────────
            stats_title: 'Statistiques',
            stats_highlight: 'Plateforme',
            stats_jobs: 'Total Emplois',
            stats_companies: 'Entreprises',
            stats_applications: 'Candidatures',
            stats_users: 'Utilisateurs Actifs',

            // ── Index – For Companies ─────────────────────────
            companies_title: 'Pour Entreprises',
            companies_subtitle: 'Trouvez et recrutez les meilleurs talents à distance du monde entier',
            companies_talent_title: 'Accédez aux Meilleurs Talents',
            companies_talent_desc: 'Connectez-vous avec des professionnels qualifiés du monde entier prêts à travailler à distance.',
            companies_hiring_title: 'Recrutement Rapide',
            companies_hiring_desc: 'Publiez des offres en quelques minutes et commencez à recevoir des candidatures de candidats qualifiés.',
            companies_grow_title: 'Développez Votre Équipe',
            companies_grow_desc: "Constituez une équipe à distance de classe mondiale sans limitations géographiques.",
            companies_btn: 'Recruter des Talents',

            // ── Index – Team ──────────────────────────────────
            team_title: 'Rencontrez',
            team_highlight: "L'Équipe",
            team_subtitle: 'Des professionnels passionnés dédiés à connecter les talents avec les opportunités',
            role_founder: 'Fondateur & PDG',
            role_coo: 'Directrice des Opérations',
            role_strategy: 'Équipe Stratégie Mondiale',
            role_remote: 'Innovation à Distance',
            role_connecting: 'Relier les Continents',
            role_future: "Construire l'Avenir",

            // ── Footer ────────────────────────────────────────
            footer_tagline: "Connecter les talents avec des opportunités de télétravail dans le monde entier",
            footer_quick_links: 'Liens Rapides',
            footer_for_companies: 'Pour Entreprises',
            footer_resources: 'Ressources',
            footer_rights: 'Tous droits réservés.',

            // ── Jobs Page ─────────────────────────────────────
            jobs_hero_title: 'Opportunités Élite à Distance',
            jobs_hero_subtitle: 'Découvrez des postes de classe mondiale dans les meilleures entreprises. Votre carrière de rêve en télétravail commence ici.',
            jobs_filter_all_cats: 'Toutes Catégories',
            jobs_filter_all_types: 'Tous Types',
            filter_cat_development: 'Développement',
            filter_cat_design: 'Design',
            filter_cat_marketing: 'Marketing',
            filter_cat_management: 'Gestion',
            filter_cat_sales: 'Ventes',
            filter_cat_support: 'Support',
            filter_type_fulltime: 'Temps plein',
            filter_type_parttime: 'Temps partiel',
            filter_type_contract: 'Contrat',
            filter_type_freelance: 'Freelance',
            jobs_found: 'emplois trouvés',
            jobs_all: 'Toutes Catégories',
            jobs_apply: 'Postuler',
            apply_now: 'Postuler Maintenant',
            jobs_view_all: 'Voir Tous les Emplois',
            jobs_title: 'Opportunités',
            jobs_highlight: 'À Distance',
            jobs_subtitle: 'Découvrez votre prochain mouvement de carrière',

            // ── Job Details Page ──────────────────────────────
            back_to_jobs: 'Retour aux Emplois',
            about_role: 'À Propos du Poste',
            responsibilities: 'Responsabilités',
            requirements: 'Exigences',
            benefits_title: 'Avantages',
            save_job: "Sauvegarder l'Offre",
            label_salary: 'Salaire',
            label_posted: 'Publié',
            label_experience: 'Expérience',
            share_job: 'Partager cette offre :',
            job_not_found: 'Emploi Introuvable',
            job_not_found_desc: "L'emploi que vous recherchez n'existe pas.",
            btn_browse: 'Voir les Emplois',
            modal_apply_for: 'Postuler pour',
            modal_at: 'chez',
            form_full_name: 'Nom Complet',
            form_email_addr: 'Adresse Email',
            form_resume: 'Lien CV / Portfolio',
            form_cover_letter: 'Lettre de Motivation',
            btn_submit: 'Soumettre la Candidature',

            // ── About Page ────────────────────────────────────
            about_hero_title: 'Redéfinir le',
            about_hero_highlight: 'Télétravail',
            about_hero_subtitle: "Nous avons pour mission de connecter des professionnels talentueux avec des opportunités de télétravail exceptionnelles dans le monde entier.",
            about_mission_title: 'Notre Mission',
            about_mission_p1: "Chez Télétravail, nous croyons que le talent ne connaît pas de frontières. Notre plateforme comble le fossé entre des professionnels exceptionnels et des entreprises visionnaires, permettant des relations significatives qui transcendent les limitations géographiques.",
            about_mission_p2: "Nous nous engageons à créer un monde où le travail est défini par l'impact, pas par la localisation. Grâce à une technologie de pointe et un service personnalisé, nous permettons aux individus de bâtir des carrières épanouissantes tout en maintenant la flexibilité de travailler de n'importe où.",
            about_values_title: 'Nos',
            about_values_highlight: 'Valeurs',
            about_values_subtitle: 'Les principes qui guident tout ce que nous faisons',
            val_people: 'Les Personnes d\'Abord',
            val_people_desc: 'Nous privilégions le succès et le bien-être des professionnels comme des employeurs au sein de notre communauté.',
            val_innovation: 'Innovation',
            val_innovation_desc: 'Nous faisons évoluer continuellement notre plateforme pour répondre aux besoins changeants de la main-d\'œuvre moderne.',
            val_trust: 'Confiance',
            val_trust_desc: 'Nous maintenons les plus hauts standards d\'intégrité et de transparence dans toutes nos interactions.',
            about_cta_title: 'Prêt à Commencer Votre Parcours à Distance ?',
            about_cta_subtitle: "Rejoignez des milliers de professionnels qui ont trouvé leur poste de rêve en télétravail via Télétravail.",
            btn_get_started: 'Commencer',
            btn_browse_jobs: 'Voir les Emplois',

            // ── Contact Page ──────────────────────────────────
            contact_hero_title: 'Prenez',
            contact_hero_highlight: 'Contact',
            contact_hero_subtitle: "Des questions ? Nous serions ravis de vous entendre. Envoyez-nous un message et nous vous répondrons dès que possible.",
            send_message: 'Envoyez-nous un message',
            form_name: 'Votre Nom',
            form_email: 'Adresse Email',
            form_subject: 'Sujet',
            form_message: 'Message',
            btn_send: 'Envoyer le Message',
            contact_info: 'Informations de Contact',
            contact_email: 'Email',
            contact_phone: 'Téléphone',
            contact_office: 'Bureau',
            follow_us: 'Suivez-nous',
            faq_title: 'Questions',
            faq_highlight: 'Fréquentes',
            faq_subtitle: 'Réponses rapides aux questions courantes',
            faq_q1: 'Comment créer un compte ?',
            faq_a1: 'Cliquez simplement sur « Rejoindre » et remplissez le formulaire d\'inscription. Cela prend moins de 2 minutes.',
            faq_q2: 'Télétravail est-il gratuit ?',
            faq_a2: 'Oui ! La création d\'un compte et la navigation parmi les offres sont totalement gratuites pour les professionnels. Nous ne facturons que les entreprises pour la publication d\'offres.',
            faq_q3: 'Combien de temps pour recevoir une réponse d\'une entreprise ?',
            faq_a3: 'Les délais varient selon les entreprises, mais la plupart des employeurs examinent les candidatures sous 5 à 7 jours ouvrables.',
            faq_q4: 'Puis-je postuler à plusieurs postes ?',
            faq_a4: 'Absolument ! Vous pouvez postuler à autant de postes que vous le souhaitez. Nous recommandons d\'adapter votre candidature pour chaque poste.',

            // ── Common ────────────────────────────────────────
            full_remote: 'Télétravail Complet',
            hybrid: 'Hybride',
            full_time: 'Temps plein',
            part_time: 'Temps partiel',
            contract: 'Contrat',
            filter_search_placeholder: 'Rechercher un emploi...',
            filter_location: 'Lieu',
            filter_category: 'Catégorie',
            filter_type: 'Type',

            // ── Company Dashboard Sidebar ─────────────────────
            nav_overview: 'Tableau de bord',
            nav_post_job: 'Publier une offre',
            nav_manage_jobs: 'Gérer les offres',
            nav_company_profile: 'Profil entreprise',
            nav_logout: 'Déconnexion',
            search_placeholder: 'Rechercher...',

            // ── Company Dashboard – Main ──────────────────────
            company_dash_title: 'Tableau de bord Entreprise',
            company_dash_subtitle: "Gérez vos offres d'emploi et candidats",
            total_jobs: 'Total offres',
            active_postings: 'Offres actives',
            total_applications: 'Total candidatures',
            candidates: 'Candidats',
            active_jobs: 'Offres actives',
            currently_hiring: 'En cours de recrutement',
            recent_postings: 'Offres récentes',
            view_all: 'Voir tout',
            recent_applications: 'Candidatures récentes',
            table_applicant: 'Candidat',
            table_position: 'Poste',
            table_applied_date: 'Date de candidature',
            table_status: 'Statut',

            // ── Post Job Page ─────────────────────────────────
            post_job_title: 'Publier une offre',
            post_job_subtitle: 'Trouvez le candidat idéal pour votre équipe',
            edit_job_title: "Modifier l'offre",
            form_job_title: 'Intitulé du poste *',
            form_job_type: 'Type de contrat *',
            form_location: 'Lieu *',
            form_salary: 'Fourchette salariale',
            form_job_desc: 'Description du poste *',
            form_requirements: 'Exigences *',
            form_benefits: 'Avantages (Optionnel)',
            form_status: 'Statut *',
            type_full_time: 'Temps plein',
            type_part_time: 'Temps partiel',
            type_contract: 'Contrat',
            type_freelance: 'Freelance',
            loc_remote: 'À distance',
            loc_hybrid: 'Hybride',
            loc_onsite: 'Sur site',
            status_active: 'Actif',
            status_draft: 'Brouillon',
            btn_cancel: 'Annuler',
            btn_post_job: "Publier l'offre",
            btn_update_job: 'Mettre à jour',
            btn_post_new_job: 'Nouvelle offre',

            // ── Manage Jobs Page ──────────────────────────────
            manage_jobs_title: 'Gérer les offres',
            manage_jobs_subtitle: "Consultez et gérez toutes vos offres d'emploi",

            // ── Company Profile Page ──────────────────────────
            company_profile_title: 'Profil entreprise',
            company_profile_subtitle: 'Gérez les informations de votre entreprise',
            form_company_name: "Nom de l'entreprise *",
            form_company_email: 'Email entreprise *',
            form_website: 'Site web',
            form_description: "Description de l'entreprise",
            btn_update_profile: 'Mettre à jour',

            // ── Applicants Page ───────────────────────────────
            manage_applicants_title: 'Gérer les candidatures',
            manage_applicants_subtitle: 'Consultez et gérez les candidatures',
            btn_back_jobs: 'Retour aux offres',

            // ── User Dashboard Sidebar ──────────────────────────
            nav_profile: 'Mon profil',
            nav_applications: 'Mes candidatures',
            nav_remote_jobs: 'Emplois à distance',

            // ── User Dashboard – Overview ─────────────────────
            dash_welcome: 'Votre hub de carrière à distance commence ici',
            dash_welcome_sub: "Voici ce qui se passe dans votre recherche d'emploi",
            stat_total_apps: 'Total candidatures',
            stat_saved: 'Emplois sauvegardés',
            stat_messages: 'Messages',
            stat_profile_views: 'Vues du profil',
            my_applications: 'Mes candidatures',
            dash_pos: 'Poste',
            dash_company: 'Entreprise',
            dash_applied: 'Date de candidature',
            dash_status: 'Statut',

            // ── Applications Page ─────────────────────────────
            apps_subtitle: 'Suivez vos candidatures et leur statut',
            no_apps_title: "Vous n'avez pas encore postulé.",
            no_apps_desc: 'Commencez à explorer les opportunités à distance aujourd’hui.',
            browse_jobs: 'Parcourir les emplois',
            filter_all_status: 'Tous les statuts',
            status_pending: 'En attente',
            status_interview: 'Entretien',
            status_accepted: 'Accepté',
            status_rejected: 'Refusé',
            sort_recent: 'Plus récent',
            sort_oldest: 'Plus ancien',
            sort_company: 'Entreprise A-Z',
            applications: 'candidatures',
            view_details: 'Voir détails',

            // ── Dashboard Jobs Page ───────────────────────────
            dash_jobs_title: 'Opportunités d’emploi à distance',
            dash_jobs_subtitle: 'Découvrez votre prochaine étape de carrière',
            filter_all_categories: 'Toutes catégories',
            cat_development: 'Développement',
            cat_design: 'Design',
            cat_marketing: 'Marketing',
            cat_management: 'Management',
            cat_sales: 'Ventes',
            cat_support: 'Support',
            filter_all_types: 'Tous types',

            // ── Profile Page ────────────────────────────────
            profile_settings: 'Paramètres du profil',
            profile_subtitle: 'Gérez vos informations personnelles et préférences',
            change_photo: 'Changer la photo',
            personal_info: 'Informations personnelles',
            prof_info: 'Informations professionnelles',
            form_name: 'Nom complet',
            form_email: 'Adresse e-mail',
            form_phone: 'Numéro de téléphone',
            form_remote_pref: 'Préférence de télétravail',
            form_skills: 'Compétences (séparées par virgule)',
            form_about: 'À propos de moi',
            btn_save_changes: 'Enregistrer'
        }
    },

    /**
     * Get a translated string by key.
     * Falls back to the key name if not found.
     */
    t(key) {
        return (this.translations[this.currentLang] || {})[key]
            || (this.translations['en'] || {})[key]
            || key;
    },

    /**
     * Switch language, persist to localStorage, and re-render the page.
     */
    setLanguage(lang) {
        if (!this.translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        this.updatePage();
        this.updateLanguageButtons();
    },

    /**
     * Re-render all elements that carry a data-i18n or data-i18n-placeholder attribute.
     */
    updatePage() {
        // Text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });

        // Placeholder text (inputs / textareas)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        // Emit a custom event so dynamic renderers (JobsRenderer, etc.) can react
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
    },

    /**
     * Highlight the currently active language button.
     */
    updateLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            const isActive = lang === this.currentLang;

            btn.classList.toggle('lang-active', isActive);

            // Visual feedback via inline style (matches existing navbar pattern)
            btn.style.borderColor = isActive ? 'var(--gold-accent)' : 'var(--border-color)';
            btn.style.color = isActive ? 'var(--gold-accent)' : 'var(--muted-text)';
            btn.style.fontWeight = isActive ? '700' : '400';
        });
    },

    /**
     * Attach click listeners to every language button on the page.
     * Safe to call multiple times — uses a guard attribute to avoid duplicates.
     */
    attachLanguageListeners() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.hasAttribute('data-i18n-bound')) return;
            btn.setAttribute('data-i18n-bound', '1');

            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                if (lang && lang !== this.currentLang) {
                    this.setLanguage(lang);
                }
            });
        });
    },

    /**
     * Initialise the system on page load.
     */
    init() {
        const saved = localStorage.getItem('language') || 'en';
        this.currentLang = saved;
        document.documentElement.lang = saved;

        this.updatePage();
        this.updateLanguageButtons();
        this.attachLanguageListeners();
    }
};

// ── Bootstrap ──────────────────────────────────────────────────
if (typeof window !== 'undefined') {
    window.i18n = i18n;
    document.addEventListener('DOMContentLoaded', () => i18n.init());
}
