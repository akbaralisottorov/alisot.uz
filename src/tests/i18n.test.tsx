import { describe, test, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTranslation, translations } from '../lib/i18n';

// Mock useParams from react-router-dom
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

import { useParams } from 'react-router-dom';

describe('Internationalization System', () => {
  test('should fallback to uz language when no param is specified', () => {
    vi.mocked(useParams).mockReturnValue({});
    
    const { result } = renderHook(() => useTranslation());
    
    expect(result.current.currentLang).toBe('uz');
    expect(result.current.t('nav.home')).toBe(translations.uz.nav.home);
    expect(result.current.langPrefix).toBe('');
  });

  test('should parse en language parameter', () => {
    vi.mocked(useParams).mockReturnValue({ lang: 'en' });
    
    const { result } = renderHook(() => useTranslation());
    
    expect(result.current.currentLang).toBe('en');
    expect(result.current.t('nav.home')).toBe(translations.en.nav.home);
    expect(result.current.langPrefix).toBe('/en');
  });

  test('should parse ru language parameter', () => {
    vi.mocked(useParams).mockReturnValue({ lang: 'ru' });
    
    const { result } = renderHook(() => useTranslation());
    
    expect(result.current.currentLang).toBe('ru');
    expect(result.current.t('nav.home')).toBe(translations.ru.nav.home);
    expect(result.current.langPrefix).toBe('/ru');
  });

  test('should return key name if translation key does not exist', () => {
    vi.mocked(useParams).mockReturnValue({ lang: 'en' });
    
    const { result } = renderHook(() => useTranslation());
    
    // @ts-ignore
    expect(result.current.t('nonexistent.key')).toBe('nonexistent.key');
  });
});
