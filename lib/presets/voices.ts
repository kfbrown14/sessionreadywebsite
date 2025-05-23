// src/data/voices.ts

/**
 * Represents a TTS voice option from the Gemini Live API.
 */
export interface VoiceOption {
    /** Unique identifier matching the API voiceName */
    id: string;
    /** Display label for UI (can include spaces) */
    label: string;
    /** Descriptive tone/category for grouping */
    tone: string;
    /** Gender for voice matching */
    gender: 'male' | 'female' | 'binary' | 'neutral';
    /** Additional descriptors like age range, ethnicity, accent, etc. */
    attributes?: string;
  }
  
  /**
   * All available voices, with human-friendly labels, tone, gender, and descriptors.
   */
  export const voiceOptions: VoiceOption[] = [
    { id: 'Zephyr',       label: 'Zephyr',       tone: 'Bright',      gender: 'female'                           },
    { id: 'Puck',         label: 'Puck',         tone: 'Upbeat',      gender: 'male',        attributes: 'nasal'                  },
    { id: 'Charon',       label: 'Charon',       tone: 'Informative', gender: 'male',        attributes: 'Black'                  },
    { id: 'Kore',         label: 'Kore',         tone: 'Firm',        gender: 'female',      attributes: 'white mid twenties-thirty' },
    { id: 'Fenrir',       label: 'Fenrir',       tone: 'Excitable',   gender: 'male',        attributes: 'white'                  },
    { id: 'Leda',         label: 'Leda',         tone: 'Youthful',    gender: 'female',      attributes: 'woman'                  },
    { id: 'Orus',         label: 'Orus',         tone: 'Firm',        gender: 'male',        attributes: 'slow'                   },
    { id: 'Aoede',        label: 'Aoede',        tone: 'Breezy',      gender: 'female',      attributes: '30s woman'             },
    { id: 'Callirrhoe',   label: 'Callirrhoe',   tone: 'Easy-going',  gender: 'female',      attributes: 'woman'                  },
    { id: 'Autonoe',      label: 'Autonoe',      tone: 'Bright',      gender: 'female',      attributes: 'young woman'           },
    { id: 'Enceladus',    label: 'Enceladus',    tone: 'Neutral',     gender: 'male',        attributes: '40s man'                },
    { id: 'Iapetus',      label: 'Iapetus',      tone: 'Clear',       gender: 'male',        attributes: '30s man'                },
    { id: 'Umbriel',      label: 'Umbriel',      tone: 'Easy-going',  gender: 'male'                                          },
    { id: 'Algieba',      label: 'Algieba',      tone: 'Smooth',      gender: 'male',        attributes: '40s man'                },
    { id: 'Despina',      label: 'Despina',      tone: 'Smooth',      gender: 'female',      attributes: '30s woman'             },
    { id: 'Erinome',      label: 'Erinome',      tone: 'Clear',       gender: 'female',      attributes: '30s-40s woman'         },
    { id: 'Algenib',      label: 'Algenib',      tone: 'Gravelly',    gender: 'male',        attributes: 'Black'                  },
    { id: 'Rasalgethi',   label: 'Rasalgethi',   tone: 'Informative', gender: 'male',        attributes: '30s-40s'               },
    { id: 'Laomedeia',    label: 'Laomedeia',    tone: 'Upbeat',      gender: 'female'                                       },
    { id: 'Achernar',     label: 'Achernar',     tone: 'Soft',        gender: 'female'                                       },
    { id: 'Alnilam',      label: 'Alnilam',      tone: 'Neutral',     gender: 'male',        attributes: '20s man'                },
    { id: 'Schedar',      label: 'Schedar',      tone: 'Even',        gender: 'male',        attributes: 'Black'                  },
    { id: 'Gacrux',       label: 'Gacrux',       tone: 'Mature',      gender: 'female',      attributes: 'Black'                  },
    { id: 'Pulcherrima',  label: 'Pulcherrima',  tone: 'Forward',     gender: 'binary'                                        },
    { id: 'Achird',       label: 'Achird',       tone: 'Friendly',    gender: 'male'                                          },
    { id: 'Zubenelgenubi',label: 'Zubenelgenubi',tone: 'Casual',      gender: 'neutral'                                      },
    { id: 'Vindemiatrix', label: 'Vindemiatrix', tone: 'Gentle',      gender: 'neutral'                                      },
    { id: 'Sadachbia',    label: 'Sadachbia',    tone: 'Lively',      gender: 'neutral'                                      },
    { id: 'Sadaltager',   label: 'Sadaltager',   tone: 'Knowledgeable',gender: 'neutral'                                     },
    { id: 'Sulafat',      label: 'Sulafat',      tone: 'Warm',        gender: 'neutral'                                      }
  ];