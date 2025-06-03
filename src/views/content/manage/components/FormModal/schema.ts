import { DisplayMode, FormElemType } from '@/components/Schema/enums';
import { t } from '@/i18n';

export const initSchema = () =>{
  return [
    {
      component: FormElemType.INPUT,
      label: t('文章标题'),
      name: 'title',
    },
    {
      component: FormElemType.SELECT,
      label: t('分类'),
      name: 'gender',
      required: true,
      options: [
        { value: 1, label: t('前端') },
        { value: 2, label: t('后端') },
      ],
      mode: DisplayMode.EDIT,
    },
    {
      component: FormElemType.INPUT,
      label: t('封面'),
      name: 'cover',
      required: true,
    },
    {
      component: FormElemType.INPUT,
      label: t('摘要'),
      name: 'content',
      mode: DisplayMode.VIEW,
    },
  ]
}