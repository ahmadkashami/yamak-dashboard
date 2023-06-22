import { useUtils } from '@/libs/i18n'


export default function constSystem() {
  const { t } = useUtils()
   const roleList = [{value:'ADMIN',label:t('Admin')}]
   const userType = [{value:'agency',label:t('Agency')}]


  return {
    t,
    roleList,
    userType
  }
}
