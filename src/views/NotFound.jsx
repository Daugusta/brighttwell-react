import React from 'react'
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { i18n, t } = useTranslation()
  return (
    <div>
      {t('notfound')}
    </div>
  )
}
