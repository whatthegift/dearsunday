
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					lighter: 'hsl(var(--primary-lighter))',
					dark: 'hsl(var(--primary-dark))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// GiftYourThought custom colors
				gift: {
					// Primary Yellow and variants
					yellow: '#FFC72C',          // Sunday's signature yellow
					'yellow-light': '#FFD75F',  // Lighter variant
					'yellow-lighter': '#FFEBA6', // Lightest variant
					'yellow-dark': '#E6B000',   // Darker variant
					
					// Pastel Secondary Colors
					lavender: '#E5DEFF',        // For relationship cards and accents
					sage: '#D8EAD3',            // For environmental elements and success states
					cream: '#FEF7CD',           // For subtle backgrounds
					peach: '#FDE1D3',           // For warm accents
					blush: '#FFDEE2',           // For feminine accents
					
					// User Message Colors
					'user-bubble': '#E3F2FD',   // Light blue for user chat bubbles
					'sunday-bubble': '#FFF8E1', // Light yellow for Sunday's chat bubbles
					
					// Accent Colors for CTAs and Highlights
					coral: '#FF7E67',           // For primary CTAs and notifications
					teal: '#5DBEA3',            // For success states and secondary actions
					purple: '#9C89B8',          // For special features and tertiary actions
					
					// Neutral Colors
					white: '#FFFFFF',
					'gray-50': '#F9FAFB',
					'gray-100': '#F3F4F6',
					'gray-200': '#E5E7EB',
					'gray-300': '#D1D5DB',
					'gray-400': '#9CA3AF',
					'gray-500': '#6B7280',
					'gray-600': '#4B5563',
					'gray-700': '#374151',
					'gray-800': '#1F2937',
					'gray-900': '#111827',
					black: '#000000',
				},
				
				// Status colors
				status: {
					success: '#66BB6A',
					warning: '#FFA726',
					error: '#EF5350',
					info: '#29B6F6',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'pulse-soft': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'spin-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'bounce-in': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'60%': {
						transform: 'scale(1.05)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(1)'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out forwards',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'spin-slow': 'spin-slow 3s linear infinite',
				'bounce-in': 'bounce-in 0.5s ease-out forwards',
				'shimmer': 'shimmer 2s infinite linear',
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
				'nunito': ['Nunito', 'sans-serif'],
				'playfair': ['"Playfair Display"', 'serif'],
				'inter': ['Inter', 'sans-serif']
			},
			boxShadow: {
				'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
				'button-hover': '0 4px 6px rgba(0, 0, 0, 0.12)',
				'sunday': '0 8px 16px rgba(255, 199, 44, 0.2)'
			},
			typography: {
				DEFAULT: {
					css: {
						h1: {
							fontFamily: 'Poppins, sans-serif',
							fontWeight: '700',
							fontSize: '1.2rem',
							lineHeight: '1.2',
							letterSpacing: '-0.02em'
						},
						h2: {
							fontFamily: 'Poppins, sans-serif',
							fontWeight: '600',
							fontSize: '1.1rem',
							lineHeight: '1.3',
							letterSpacing: '-0.01em'
						},
						h3: {
							fontFamily: 'Poppins, sans-serif',
							fontWeight: '600',
							fontSize: '1rem',
							lineHeight: '1.4'
						},
						h4: {
							fontFamily: 'Poppins, sans-serif',
							fontWeight: '600',
							fontSize: '0.95rem',
							lineHeight: '1.5'
						},
						p: {
							fontFamily: 'Nunito, sans-serif',
							fontSize: '1rem',
							lineHeight: '1.6'
						},
						strong: {
							fontWeight: '700'
						},
						blockquote: {
							fontStyle: 'italic',
							borderLeftColor: '#FFC72C',
							borderLeftWidth: '4px',
							paddingLeft: '1rem'
						}
					}
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
