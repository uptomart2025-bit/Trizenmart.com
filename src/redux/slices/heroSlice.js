import { createSlice } from '@reduxjs/toolkit';

const defaultHeroImage = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80';

const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    image: localStorage.getItem('heroImage') || defaultHeroImage,
    heading: localStorage.getItem('heroHeading') || 'Elevate your daily essentials',
    text: localStorage.getItem('heroText') || 'Fast shipping, premium picks, and effortless mobile shopping.',
    buttonLabel: localStorage.getItem('heroButtonLabel') || 'Browse the collection',
    ctaPath: localStorage.getItem('heroCtaPath') || '/shop'
  },
  reducers: {
    setHeroImage(state, action) {
      state.image = action.payload;
      localStorage.setItem('heroImage', action.payload);
    },
    setHeroHeading(state, action) {
      state.heading = action.payload;
      localStorage.setItem('heroHeading', action.payload);
    },
    setHeroText(state, action) {
      state.text = action.payload;
      localStorage.setItem('heroText', action.payload);
    },
    setHeroButtonLabel(state, action) {
      state.buttonLabel = action.payload;
      localStorage.setItem('heroButtonLabel', action.payload);
    },
    setHeroCtaPath(state, action) {
      state.ctaPath = action.payload;
      localStorage.setItem('heroCtaPath', action.payload);
    }
  }
});

export const { setHeroImage, setHeroHeading, setHeroText, setHeroButtonLabel, setHeroCtaPath } = heroSlice.actions;
export default heroSlice.reducer;
