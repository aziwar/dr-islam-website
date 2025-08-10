// AI HEALTH ASSISTANT - Intelligent dental health support system
// AI-powered features for symptom checking, treatment recommendations, and patient guidance

export class AIHealthAssistant {
  
  constructor(options = {}) {
    this.config = {
      // AI Model Configuration
      modelEndpoint: process.env.AI_MODEL_ENDPOINT || '/api/ai',
      apiKey: process.env.AI_API_KEY || null,
      modelVersion: 'dental-health-v2.1',
      
      // Medical Safety Settings
      enableMedicalDisclaimer: true,
      requireProfessionalConsultation: true,
      maxSymptomSeverity: 7, // Scale 1-10, above which requires immediate care
      emergencyKeywords: [
        'severe pain', 'bleeding', 'swelling', 'infection', 
        'trauma', 'broken tooth', 'knocked out', 'emergency'
      ],
      
      // Feature Flags
      enableSymptomChecker: true,
      enableTreatmentRecommendations: true,
      enableHealthTips: true,
      enableAppointmentSuggestions: true,
      enablePreventiveCare: true,
      enableDentalEducation: true,
      
      // Language Support
      supportedLanguages: ['en', 'ar'],
      defaultLanguage: 'en',
      
      // Data Privacy
      anonymizeUserData: true,
      dataRetentionDays: 30,
      enableAnalytics: true,
      
      // Response Configuration
      responseTimeout: 15000,
      maxRetries: 3,
      streamResponses: true,
      
      ...options
    };

    // AI Assistant State
    this.state = {
      currentSession: null,
      conversationHistory: [],
      userProfile: null,
      lastInteraction: null,
      emergencyMode: false,
      currentLanguage: this.config.defaultLanguage,
      isLoading: false,
      availableFeatures: []
    };

    // Medical Knowledge Base
    this.knowledgeBase = {
      symptoms: new Map(),
      treatments: new Map(),
      conditions: new Map(),
      medications: new Map(),
      procedures: new Map(),
      emergencyProtocols: new Map()
    };

    // Conversation contexts
    this.contexts = new Map();
    this.activeContext = null;

    this.init();
  }

  /**
   * Initialize AI Health Assistant
   */
  async init() {
    try {
      console.log('🤖 Initializing AI Health Assistant...');
      
      // Load medical knowledge base
      await this.loadMedicalKnowledgeBase();
      
      // Initialize AI model
      await this.initializeAIModel();
      
      // Set up conversation handling
      this.setupConversationHandling();
      
      // Set up symptom checker
      if (this.config.enableSymptomChecker) {
        this.setupSymptomChecker();
      }
      
      // Set up treatment recommendations
      if (this.config.enableTreatmentRecommendations) {
        this.setupTreatmentRecommendations();
      }
      
      // Set up health education
      if (this.config.enableDentalEducation) {
        this.setupHealthEducation();
      }
      
      // Set up emergency detection
      this.setupEmergencyDetection();
      
      // Set up multilingual support
      this.setupMultilingualSupport();
      
      // Initialize user interface
      this.createAIInterface();
      
      console.log('✅ AI Health Assistant initialized successfully');
      
    } catch (error) {
      console.error('❌ AI Health Assistant initialization failed:', error);
    }
  }

  /**
   * Load comprehensive medical knowledge base
   */
  async loadMedicalKnowledgeBase() {
    // Dental symptoms database
    const symptoms = {
      'tooth_pain': {
        severity: 6,
        urgency: 'moderate',
        possibleCauses: ['cavity', 'infection', 'cracked_tooth', 'gum_disease'],
        immediateActions: ['rinse with warm water', 'use cold compress', 'avoid hot/cold foods'],
        whenToSeekCare: 'If pain persists > 24 hours or worsens',
        description: 'Pain in or around a tooth, ranging from mild discomfort to severe throbbing'
      },
      
      'bleeding_gums': {
        severity: 4,
        urgency: 'low',
        possibleCauses: ['gingivitis', 'poor_oral_hygiene', 'aggressive_brushing'],
        immediateActions: ['gentle brushing', 'antimicrobial mouthwash', 'floss carefully'],
        whenToSeekCare: 'If bleeding persists > 1 week or accompanied by swelling',
        description: 'Blood from gums during brushing, flossing, or spontaneously'
      },
      
      'swollen_gums': {
        severity: 5,
        urgency: 'moderate',
        possibleCauses: ['gingivitis', 'periodontitis', 'abscess', 'medication_side_effect'],
        immediateActions: ['salt water rinse', 'cold compress', 'gentle oral hygiene'],
        whenToSeekCare: 'Within 48 hours if swelling is significant',
        description: 'Inflammation and enlargement of gum tissue'
      },
      
      'broken_tooth': {
        severity: 7,
        urgency: 'high',
        possibleCauses: ['trauma', 'large_cavity', 'old_filling_failure', 'teeth_grinding'],
        immediateActions: ['save tooth pieces', 'rinse mouth', 'cold compress', 'avoid chewing'],
        whenToSeekCare: 'Within 24 hours, immediately if pain is severe',
        description: 'Visible crack, chip, or fracture in tooth structure'
      },
      
      'tooth_sensitivity': {
        severity: 3,
        urgency: 'low',
        possibleCauses: ['enamel_erosion', 'gum_recession', 'recent_cleaning', 'whitening'],
        immediateActions: ['use sensitive teeth toothpaste', 'avoid extreme temperatures'],
        whenToSeekCare: 'If sensitivity persists > 2 weeks',
        description: 'Sharp pain when exposed to hot, cold, sweet, or acidic substances'
      },

      'jaw_pain': {
        severity: 5,
        urgency: 'moderate',
        possibleCauses: ['tmj_disorder', 'teeth_grinding', 'stress', 'misaligned_bite'],
        immediateActions: ['jaw exercises', 'warm compress', 'avoid hard foods'],
        whenToSeekCare: 'If pain affects eating or sleeping',
        description: 'Pain or discomfort in jaw joint and surrounding muscles'
      },

      'bad_breath': {
        severity: 2,
        urgency: 'low',
        possibleCauses: ['poor_hygiene', 'gum_disease', 'dry_mouth', 'medical_condition'],
        immediateActions: ['improve oral hygiene', 'drink more water', 'sugar-free gum'],
        whenToSeekCare: 'If persistent despite good oral hygiene',
        description: 'Persistent unpleasant odor from the mouth'
      }
    };

    // Treatment recommendations database
    const treatments = {
      'cavity_treatment': {
        procedures: ['filling', 'crown', 'root_canal'],
        preventive: ['fluoride_treatment', 'sealants'],
        homecare: ['fluoride_toothpaste', 'antimicrobial_rinse'],
        timeline: '1-2 visits depending on severity',
        cost_range: '$150-$800',
        description: 'Removal of decayed tooth material and restoration'
      },
      
      'gum_disease_treatment': {
        procedures: ['deep_cleaning', 'scaling_root_planing', 'gum_surgery'],
        preventive: ['regular_cleanings', 'improved_hygiene'],
        homecare: ['antimicrobial_mouthwash', 'soft_bristle_brush'],
        timeline: '2-4 visits for initial treatment',
        cost_range: '$200-$1200',
        description: 'Treatment to control bacterial infection in gums'
      },
      
      'tooth_whitening': {
        procedures: ['in_office_whitening', 'take_home_trays', 'whitening_strips'],
        preventive: ['avoid_staining_foods', 'regular_cleanings'],
        homecare: ['whitening_toothpaste', 'limit_coffee_wine'],
        timeline: '1-3 visits or 2-4 weeks at home',
        cost_range: '$300-$1000',
        description: 'Cosmetic treatment to lighten tooth color'
      }
    };

    // Store in knowledge base
    symptoms.forEach((value, key) => this.knowledgeBase.symptoms.set(key, value));
    treatments.forEach((value, key) => this.knowledgeBase.treatments.set(key, value));

    console.log('📚 Medical knowledge base loaded');
  }

  /**
   * Initialize AI model connection
   */
  async initializeAIModel() {
    if (!this.config.apiKey) {
      console.warn('⚠️ No AI API key provided, using local knowledge base only');
      return;
    }

    try {
      // Test connection to AI service
      const response = await fetch(`${this.config.modelEndpoint}/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('✅ AI model connection established');
        this.state.aiModelReady = true;
      } else {
        throw new Error('AI service not available');
      }
      
    } catch (error) {
      console.warn('⚠️ AI service not available, using local processing:', error);
      this.state.aiModelReady = false;
    }
  }

  /**
   * Set up symptom checker functionality
   */
  setupSymptomChecker() {
    this.symptomChecker = {
      // Symptom assessment flow
      assessSymptoms: async (symptoms, severity = 5) => {
        const assessment = await this.processSymptoms(symptoms, severity);
        
        // Check for emergency conditions
        if (this.detectEmergency(symptoms, severity)) {
          return this.createEmergencyResponse(assessment);
        }
        
        return this.createSymptomAssessment(assessment);
      },

      // Interactive symptom questionnaire
      createQuestionnaire: (initialSymptom) => {
        const questions = this.generateSymptomQuestions(initialSymptom);
        return this.createInteractiveForm(questions);
      },

      // Risk stratification
      assessRisk: (symptoms, patientHistory = {}) => {
        return this.calculateRiskScore(symptoms, patientHistory);
      }
    };
  }

  /**
   * Set up treatment recommendation system
   */
  setupTreatmentRecommendations() {
    this.treatmentRecommender = {
      // Get treatment options
      recommendTreatments: async (diagnosis, patientFactors = {}) => {
        const treatments = await this.getTreatmentOptions(diagnosis, patientFactors);
        return this.prioritizeTreatments(treatments);
      },

      // Alternative treatment options
      getAlternatives: (primaryTreatment) => {
        return this.findAlternativeTreatments(primaryTreatment);
      },

      // Cost estimation
      estimateCosts: (treatments) => {
        return treatments.map(treatment => ({
          ...treatment,
          costEstimate: this.calculateTreatmentCost(treatment)
        }));
      }
    };
  }

  /**
   * Set up health education system
   */
  setupHealthEducation() {
    this.healthEducator = {
      // Personalized health tips
      getHealthTips: (userProfile, currentConditions = []) => {
        return this.generatePersonalizedTips(userProfile, currentConditions);
      },

      // Preventive care recommendations
      getPreventiveCare: (age, riskFactors = []) => {
        return this.generatePreventivePlan(age, riskFactors);
      },

      // Educational content
      getEducationalContent: (topic) => {
        return this.getEducationalMaterial(topic);
      }
    };
  }

  /**
   * Create AI assistant interface
   */
  createAIInterface() {
    // Create floating AI assistant button
    const aiButton = document.createElement('button');
    aiButton.className = 'ai-assistant-trigger';
    aiButton.innerHTML = `
      <div class="ai-button-content">
        <div class="ai-icon">🤖</div>
        <span class="ai-button-text">Health Assistant</span>
      </div>
    `;
    
    aiButton.setAttribute('aria-label', 'Open AI Health Assistant');
    aiButton.setAttribute('title', 'Get instant dental health guidance');

    // Create main AI interface
    const aiInterface = document.createElement('div');
    aiInterface.className = 'ai-assistant-interface';
    aiInterface.style.display = 'none';
    aiInterface.innerHTML = this.generateInterfaceHTML();

    // Add styles
    this.injectAIStyles();

    // Append to DOM
    document.body.appendChild(aiButton);
    document.body.appendChild(aiInterface);

    // Set up event handlers
    this.setupInterfaceHandlers(aiButton, aiInterface);
  }

  /**
   * Generate AI interface HTML
   */
  generateInterfaceHTML() {
    return `
      <div class="ai-interface-container">
        <div class="ai-interface-header">
          <div class="ai-header-content">
            <div class="ai-avatar">🤖</div>
            <div class="ai-header-text">
              <h3>Dr. Islam AI Health Assistant</h3>
              <p>Your dental health companion</p>
            </div>
          </div>
          <button class="ai-close-btn" aria-label="Close assistant">&times;</button>
        </div>

        <div class="ai-disclaimer">
          <p><strong>⚠️ Medical Disclaimer:</strong> This AI assistant provides general dental health information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your dentist or physician with any questions about your health.</p>
        </div>

        <div class="ai-quick-actions">
          <h4>How can I help you today?</h4>
          <div class="quick-action-buttons">
            <button class="quick-action-btn" data-action="symptom-checker">
              <span class="action-icon">🔍</span>
              <span class="action-text">Symptom Checker</span>
            </button>
            <button class="quick-action-btn" data-action="health-tips">
              <span class="action-icon">💡</span>
              <span class="action-text">Health Tips</span>
            </button>
            <button class="quick-action-btn" data-action="treatment-info">
              <span class="action-icon">🏥</span>
              <span class="action-text">Treatment Info</span>
            </button>
            <button class="quick-action-btn" data-action="emergency-help">
              <span class="action-icon">🚨</span>
              <span class="action-text">Emergency Help</span>
            </button>
          </div>
        </div>

        <div class="ai-chat-container">
          <div class="ai-messages" id="ai-messages"></div>
          
          <div class="ai-input-container">
            <div class="ai-input-wrapper">
              <input 
                type="text" 
                id="ai-input" 
                placeholder="Describe your dental concern..."
                autocomplete="off"
                aria-label="Enter your dental health question"
              >
              <button id="ai-send-btn" aria-label="Send message">
                <span class="send-icon">📤</span>
              </button>
            </div>
            <div class="ai-input-suggestions">
              <button class="suggestion-btn" data-text="I have tooth pain">I have tooth pain</button>
              <button class="suggestion-btn" data-text="My gums are bleeding">My gums are bleeding</button>
              <button class="suggestion-btn" data-text="How often should I visit the dentist?">Dental visits frequency</button>
            </div>
          </div>
        </div>

        <div class="ai-loading" id="ai-loading" style="display: none;">
          <div class="loading-animation">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
          </div>
          <span>Analyzing your question...</span>
        </div>
      </div>
    `;
  }

  /**
   * Set up interface event handlers
   */
  setupInterfaceHandlers(aiButton, aiInterface) {
    // Open/close interface
    aiButton.addEventListener('click', () => {
      aiInterface.style.display = 'block';
      aiInterface.classList.add('ai-interface-open');
      this.trackEvent('ai_assistant_opened');
    });

    const closeBtn = aiInterface.querySelector('.ai-close-btn');
    closeBtn.addEventListener('click', () => {
      aiInterface.style.display = 'none';
      aiInterface.classList.remove('ai-interface-open');
      this.trackEvent('ai_assistant_closed');
    });

    // Quick action buttons
    const quickActionBtns = aiInterface.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.getAttribute('data-action');
        this.handleQuickAction(action);
      });
    });

    // Chat input
    const input = aiInterface.querySelector('#ai-input');
    const sendBtn = aiInterface.querySelector('#ai-send-btn');

    const sendMessage = () => {
      const message = input.value.trim();
      if (message) {
        this.processUserMessage(message);
        input.value = '';
      }
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    // Suggestion buttons
    const suggestionBtns = aiInterface.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.currentTarget.getAttribute('data-text');
        input.value = text;
        sendMessage();
      });
    });
  }

  /**
   * Process user message and generate AI response
   */
  async processUserMessage(message) {
    this.addMessageToChat(message, 'user');
    this.showLoading(true);

    try {
      // Detect emergency keywords
      if (this.detectEmergencyInMessage(message)) {
        this.state.emergencyMode = true;
        const emergencyResponse = this.createEmergencyResponse(message);
        this.addMessageToChat(emergencyResponse, 'ai');
        this.showLoading(false);
        return;
      }

      // Generate AI response
      const response = await this.generateAIResponse(message);
      this.addMessageToChat(response, 'ai');

      // Track interaction
      this.trackEvent('ai_message_processed', {
        message_length: message.length,
        response_type: response.type || 'general'
      });

    } catch (error) {
      console.error('❌ AI processing error:', error);
      const errorResponse = "I apologize, but I'm having trouble processing your request right now. Please try again or contact our office directly for immediate assistance.";
      this.addMessageToChat(errorResponse, 'ai');
    }

    this.showLoading(false);
  }

  /**
   * Generate AI response based on user input
   */
  async generateAIResponse(message) {
    // Clean and analyze the message
    const analyzedMessage = this.analyzeMessage(message);
    
    // Check if AI service is available
    if (this.state.aiModelReady) {
      return await this.getAIServiceResponse(message, analyzedMessage);
    } else {
      return await this.getLocalResponse(message, analyzedMessage);
    }
  }

  /**
   * Generate response using local knowledge base
   */
  async getLocalResponse(message, analysis) {
    const { intent, entities, severity } = analysis;

    switch (intent) {
      case 'symptom_inquiry':
        return this.handleSymptomInquiry(entities, severity);
      
      case 'treatment_question':
        return this.handleTreatmentQuestion(entities);
      
      case 'preventive_care':
        return this.handlePreventiveCareQuestion();
      
      case 'appointment_booking':
        return this.handleAppointmentInquiry();
      
      case 'general_dental':
        return this.handleGeneralDentalQuestion(entities);
      
      default:
        return this.getDefaultResponse();
    }
  }

  /**
   * Handle symptom inquiry
   */
  handleSymptomInquiry(symptoms, severity) {
    if (symptoms.length === 0) {
      return "I'd be happy to help you understand your symptoms. Could you tell me more specifically what you're experiencing? For example, do you have tooth pain, gum swelling, sensitivity, or other concerns?";
    }

    const primarySymptom = symptoms[0];
    const symptomData = this.knowledgeBase.symptoms.get(primarySymptom);

    if (!symptomData) {
      return "I understand you're experiencing some dental discomfort. While I can provide general guidance, I'd recommend describing your symptoms in more detail or scheduling an appointment for a proper evaluation.";
    }

    let response = `Based on what you've described, here's some helpful information:\n\n`;
    response += `**${this.formatSymptomName(primarySymptom)}**\n`;
    response += `${symptomData.description}\n\n`;
    
    if (symptomData.immediateActions.length > 0) {
      response += `**Immediate steps you can take:**\n`;
      symptomData.immediateActions.forEach(action => {
        response += `• ${action}\n`;
      });
      response += `\n`;
    }

    response += `**When to seek professional care:** ${symptomData.whenToSeekCare}\n\n`;

    if (severity >= this.config.maxSymptomSeverity || symptomData.severity >= 7) {
      response += `🚨 **Important:** Based on the severity you've described, I recommend seeking professional dental care soon. If you're experiencing severe pain, please contact our emergency line.\n\n`;
    }

    response += `*Please remember: This information is for educational purposes only and doesn't replace professional medical advice.*`;

    return response;
  }

  /**
   * Handle quick actions
   */
  handleQuickAction(action) {
    const responses = {
      'symptom-checker': "Let's check your symptoms. Please describe what you're experiencing - for example, 'I have tooth pain' or 'My gums are swollen'.",
      'health-tips': this.getRandomHealthTip(),
      'treatment-info': "I can help you learn about dental treatments. What specific procedure or treatment would you like to know about?",
      'emergency-help': this.getEmergencyGuidance()
    };

    const response = responses[action] || "How can I assist you with your dental health today?";
    this.addMessageToChat(response, 'ai');
  }

  /**
   * Get emergency guidance
   */
  getEmergencyGuidance() {
    return `🚨 **Dental Emergency Guidance**

**For immediate emergencies, call: [Your Emergency Number]**

**Common dental emergencies and first aid:**

**Severe tooth pain:**
• Rinse mouth with warm water
• Use cold compress on outside of cheek
• Take over-the-counter pain reliever as directed
• Avoid placing aspirin directly on gums

**Knocked-out tooth:**
• Handle tooth by crown only, not root
• Rinse gently with water if dirty
• Try to place back in socket, or keep in milk
• Seek immediate dental care (within 30 minutes if possible)

**Broken tooth:**
• Save any pieces
• Rinse mouth with warm water
• Apply cold compress to reduce swelling
• See dentist as soon as possible

**Call our emergency line immediately if you experience:**
• Severe, persistent pain
• Significant swelling affecting breathing or swallowing
• Trauma to teeth or jaw
• Uncontrolled bleeding`;
  }

  /**
   * Get random health tip
   */
  getRandomHealthTip() {
    const tips = [
      "🦷 Brush your teeth twice daily with fluoride toothpaste for at least 2 minutes each time.",
      "🧵 Floss daily to remove plaque and food particles between teeth that brushing can't reach.",
      "🥤 Limit sugary and acidic drinks. If you do consume them, use a straw and rinse with water afterwards.",
      "🍎 Eat a balanced diet rich in fruits, vegetables, and calcium for strong teeth and healthy gums.",
      "🚭 Avoid tobacco products, which increase your risk of gum disease and oral cancer.",
      "💧 Stay hydrated! Drinking water helps wash away food particles and bacteria.",
      "🦷 Replace your toothbrush every 3-4 months or after you've been sick.",
      "👨‍⚕️ Visit your dentist regularly for cleanings and check-ups - typically every 6 months."
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    return `**Daily Health Tip:**\n\n${randomTip}\n\n*Want more personalized advice? I'm here to help with your specific dental health questions!*`;
  }

  /**
   * Add message to chat interface
   */
  addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('ai-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `ai-message ai-message--${sender}`;
    
    if (sender === 'ai') {
      messageElement.innerHTML = `
        <div class="ai-message-avatar">🤖</div>
        <div class="ai-message-content">${this.formatMessage(message)}</div>
      `;
    } else {
      messageElement.innerHTML = `
        <div class="ai-message-content">${this.formatMessage(message)}</div>
        <div class="ai-message-avatar">👤</div>
      `;
    }

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /**
   * Format message for display
   */
  formatMessage(message) {
    // Convert markdown-like formatting to HTML
    return message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  /**
   * Show/hide loading indicator
   */
  showLoading(show) {
    const loading = document.getElementById('ai-loading');
    loading.style.display = show ? 'flex' : 'none';
    this.state.isLoading = show;
  }

  /**
   * Analyze user message for intent and entities
   */
  analyzeMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Intent detection
    let intent = 'general';
    if (this.containsSymptomKeywords(lowerMessage)) {
      intent = 'symptom_inquiry';
    } else if (this.containsTreatmentKeywords(lowerMessage)) {
      intent = 'treatment_question';
    } else if (this.containsPreventiveKeywords(lowerMessage)) {
      intent = 'preventive_care';
    } else if (this.containsAppointmentKeywords(lowerMessage)) {
      intent = 'appointment_booking';
    }

    // Entity extraction (symptoms)
    const entities = this.extractSymptomEntities(lowerMessage);
    
    // Severity estimation (1-10)
    const severity = this.estimateSeverity(lowerMessage);

    return { intent, entities, severity };
  }

  /**
   * Detect emergency in message
   */
  detectEmergencyInMessage(message) {
    const lowerMessage = message.toLowerCase();
    return this.config.emergencyKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    );
  }

  /**
   * Create emergency response
   */
  createEmergencyResponse(message) {
    return `🚨 **DENTAL EMERGENCY DETECTED**

I understand you may be experiencing a dental emergency. Please:

**1. For severe pain or trauma - Call our emergency line: [Your Emergency Number]**

**2. If this is life-threatening (difficulty breathing/swallowing) - Call 911**

**3. For immediate relief while seeking care:**
• Apply cold compress to reduce swelling
• Rinse with warm salt water
• Take over-the-counter pain medication as directed
• Avoid hot/cold foods and drinks

**Our emergency dental services are available 24/7 for:**
• Severe tooth pain
• Dental trauma
• Knocked-out teeth
• Uncontrolled bleeding
• Facial swelling

*This AI assistant cannot replace emergency medical care. Please seek immediate professional help for urgent dental problems.*`;
  }

  /**
   * Inject AI styles
   */
  injectAIStyles() {
    const css = `
      .ai-assistant-trigger {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #BEB093 0%, #a89680 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 12px 20px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(190, 176, 147, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        font-family: inherit;
      }
      
      .ai-assistant-trigger:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(190, 176, 147, 0.4);
      }
      
      .ai-button-content {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .ai-icon {
        font-size: 1.2rem;
      }
      
      .ai-assistant-interface {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 400px;
        max-width: calc(100vw - 40px);
        height: 600px;
        max-height: calc(100vh - 100px);
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 1001;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      .ai-interface-open {
        transform: translateY(0);
        opacity: 1;
      }
      
      .ai-interface-header {
        background: linear-gradient(135deg, #BEB093 0%, #a89680 100%);
        color: white;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .ai-header-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .ai-avatar {
        font-size: 1.5rem;
      }
      
      .ai-header-text h3 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
      }
      
      .ai-header-text p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.9;
      }
      
      .ai-close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background 0.2s ease;
      }
      
      .ai-close-btn:hover {
        background: rgba(255,255,255,0.2);
      }
      
      .ai-disclaimer {
        background: #fff3cd;
        color: #856404;
        padding: 12px 16px;
        font-size: 0.8rem;
        line-height: 1.4;
      }
      
      .ai-quick-actions {
        padding: 16px;
        border-bottom: 1px solid #eee;
      }
      
      .ai-quick-actions h4 {
        margin: 0 0 12px 0;
        font-size: 0.9rem;
        font-weight: 600;
      }
      
      .quick-action-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      
      .quick-action-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.85rem;
      }
      
      .quick-action-btn:hover {
        background: #e9ecef;
        transform: translateY(-1px);
      }
      
      .ai-chat-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .ai-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .ai-message {
        display: flex;
        gap: 8px;
        align-items: flex-start;
      }
      
      .ai-message--user {
        flex-direction: row-reverse;
      }
      
      .ai-message-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        flex-shrink: 0;
      }
      
      .ai-message--user .ai-message-avatar {
        background: #007bff;
        color: white;
      }
      
      .ai-message--ai .ai-message-avatar {
        background: #f8f9fa;
      }
      
      .ai-message-content {
        background: #f8f9fa;
        padding: 10px 14px;
        border-radius: 12px;
        max-width: 280px;
        font-size: 0.9rem;
        line-height: 1.4;
      }
      
      .ai-message--user .ai-message-content {
        background: #007bff;
        color: white;
      }
      
      .ai-input-container {
        border-top: 1px solid #eee;
        padding: 16px;
      }
      
      .ai-input-wrapper {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;
      }
      
      .ai-input-wrapper input {
        flex: 1;
        padding: 10px 14px;
        border: 1px solid #ddd;
        border-radius: 20px;
        font-size: 0.9rem;
        outline: none;
      }
      
      .ai-input-wrapper input:focus {
        border-color: #BEB093;
      }
      
      .ai-input-wrapper button {
        background: #BEB093;
        color: white;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;
      }
      
      .ai-input-wrapper button:hover {
        background: #a89680;
      }
      
      .ai-input-suggestions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      
      .suggestion-btn {
        background: none;
        border: 1px solid #ddd;
        border-radius: 16px;
        padding: 4px 10px;
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .suggestion-btn:hover {
        background: #f8f9fa;
        border-color: #BEB093;
      }
      
      .ai-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 20px;
        font-size: 0.9rem;
        color: #666;
      }
      
      .loading-animation {
        display: flex;
        gap: 4px;
      }
      
      .loading-dot {
        width: 8px;
        height: 8px;
        background: #BEB093;
        border-radius: 50%;
        animation: loading-pulse 1.4s infinite both;
      }
      
      .loading-dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .loading-dot:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes loading-pulse {
        0%, 80%, 100% { opacity: 0.3; }
        40% { opacity: 1; }
      }
      
      @media (max-width: 768px) {
        .ai-assistant-interface {
          bottom: 10px;
          right: 10px;
          left: 10px;
          width: auto;
        }
        
        .quick-action-buttons {
          grid-template-columns: 1fr;
        }
      }
    `;
    
    this.injectCSS(css, 'ai-assistant-styles');
  }

  /**
   * Utility methods
   */

  injectCSS(css, id) {
    const existingStyle = document.getElementById(id);
    if (existingStyle) {
      existingStyle.remove();
    }
    
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }

  trackEvent(eventName, data = {}) {
    console.log(`🤖 AI Event: ${eventName}`, data);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'ai_assistant',
        ...data
      });
    }
  }

  containsSymptomKeywords(message) {
    const symptomKeywords = ['pain', 'hurt', 'ache', 'bleeding', 'swollen', 'sensitive', 'broken', 'cracked', 'loose'];
    return symptomKeywords.some(keyword => message.includes(keyword));
  }

  containsTreatmentKeywords(message) {
    const treatmentKeywords = ['treatment', 'procedure', 'filling', 'crown', 'root canal', 'cleaning', 'extraction'];
    return treatmentKeywords.some(keyword => message.includes(keyword));
  }

  containsPreventiveKeywords(message) {
    const preventiveKeywords = ['prevent', 'care', 'hygiene', 'brushing', 'flossing', 'checkup', 'cleaning'];
    return preventiveKeywords.some(keyword => message.includes(keyword));
  }

  containsAppointmentKeywords(message) {
    const appointmentKeywords = ['appointment', 'book', 'schedule', 'visit', 'see doctor', 'consultation'];
    return appointmentKeywords.some(keyword => message.includes(keyword));
  }

  extractSymptomEntities(message) {
    const entities = [];
    this.knowledgeBase.symptoms.forEach((_, symptom) => {
      if (message.includes(symptom.replace('_', ' '))) {
        entities.push(symptom);
      }
    });
    return entities;
  }

  estimateSeverity(message) {
    const severityKeywords = {
      10: ['unbearable', 'excruciating', 'extreme'],
      9: ['severe', 'intense', 'terrible'],
      8: ['bad', 'awful', 'horrible'],
      7: ['strong', 'significant'],
      6: ['moderate', 'noticeable'],
      5: ['mild', 'slight'],
      4: ['little', 'minor'],
      3: ['very little', 'barely'],
      2: ['tiny', 'minimal'],
      1: ['almost none']
    };

    for (let [severity, keywords] of Object.entries(severityKeywords).reverse()) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return parseInt(severity);
      }
    }

    return 5; // Default moderate severity
  }

  formatSymptomName(symptom) {
    return symptom.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  getDefaultResponse() {
    return "I'm here to help with your dental health questions! You can ask me about symptoms, treatments, preventive care, or schedule an appointment. What would you like to know?";
  }

  /**
   * Public API methods
   */

  /**
   * Send message programmatically
   */
  sendMessage(message) {
    return this.processUserMessage(message);
  }

  /**
   * Get AI assistant state
   */
  getAssistantState() {
    return { ...this.state };
  }

  /**
   * Clear conversation history
   */
  clearConversation() {
    this.state.conversationHistory = [];
    const messagesContainer = document.getElementById('ai-messages');
    if (messagesContainer) {
      messagesContainer.innerHTML = '';
    }
  }

  /**
   * Destroy AI assistant
   */
  destroy() {
    // Remove interface elements
    const trigger = document.querySelector('.ai-assistant-trigger');
    const interface = document.querySelector('.ai-assistant-interface');
    
    if (trigger) trigger.remove();
    if (interface) interface.remove();
    
    // Clear state
    this.state = {};
    this.contexts.clear();
    
    console.log('🤖 AI Health Assistant destroyed');
  }
}

// Initialize AI Health Assistant when DOM is ready
let aiHealthAssistant = null;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    aiHealthAssistant = new AIHealthAssistant();
    window.aiHealthAssistant = aiHealthAssistant;
  });
} else {
  aiHealthAssistant = new AIHealthAssistant();
  window.aiHealthAssistant = aiHealthAssistant;
}

export default AIHealthAssistant;