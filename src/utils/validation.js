import { isEmpty } from './index'
import { useUtils } from '@/libs/i18n'


export default function useValidation() {
  const { t } = useUtils()



   const emailValidator = value => {
    if (isEmpty(value)) {
      return true
    }

    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (Array.isArray(value)) {
      return value.every(val => re.test(String(val)))
    }

    return re.test(String(value)) || t( 'The Email field must be a valid email')
  }

   const passwordValidator = password => {
    /* eslint-disable no-useless-escape */
    const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
    /* eslint-enable no-useless-escape */
    const validPassword = regExp.test(password)

    return (
      // eslint-disable-next-line operator-linebreak
      validPassword ||
      t('Field must contain at least one uppercase, lowercase, special character and digit with min 8 chars')
    )
  }

   const confirmedValidator = (value, target) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    value === target || t('The Confirm Password field confirmation does not match')

   const between = (value, min, max) => () => {
    const valueAsNumber = Number(value)
    let error=`Enter number between ${min} and ${max}`;
    return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || t(error)
  }

   const integerValidator = value => {
    if (isEmpty(value)) {
      return true
    }

    if (Array.isArray(value)) {
      return value.every(val => /^-?[0-9]+$/.test(String(val)))
    }

    return /^-?[0-9]+$/.test(String(value)) || t('This field must be an integer')
  }

   const regexValidator = (value, regex) => {
    if (isEmpty(value)) {
      return true
    }

    let regeX = regex
    if (typeof regeX === 'string') {
      regeX = new RegExp(regeX)
    }

    if (Array.isArray(value)) {
      return value.every(val => regexValidator(val, { regeX }))
    }

    return regeX.test(String(value)) || t('The Regex field format is invalid')
  }

   const alphaValidator = value => {
    if (isEmpty(value)) {
      return true
    }

    // const valueAsString = String(value)

    return /^[A-Z]*$/i.test(String(value)) || t('The Alpha field may only contain alphabetic characters')
  }

   const urlValidator = value => {
    if (value === undefined || value === null || value.length === 0) {
      return true
    }
    /* eslint-disable no-useless-escape */
    const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/

    return re.test(value) || t('URL is invalid')
  }

   const lengthValidator = (value, length) => {
    if (isEmpty(value)) {
      return true
    }

    return value.length === length || `The Min Character field must be at least ${length} characters`
  }
   const alphaDashValidator = value => {
    if (isEmpty(value)) {
      return true
    }

    const valueAsString = String(value)

    return /^[0-9A-Z_-]*$/i.test(valueAsString) || t('All Character is not valid')
  }
    const integerPositive = value => {
    return value >= 0 ? true : t('This field must be an positive')
  }

  const emailRules= [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ]
  const domainValidator= [
    v => !!v || 'Domain is required',
    v => /.+\..+/.test(v) || 'Domain must be valid',
  ]



  const requiredRules= [v => !!v || 'Item is required']
  const requiredMultiple= [v =>  v.length>0 || 'Item is required']

  const phoneRules = [
    (value, phone, { label, country, example }) => !!value || `The Phone field is required.`,
  ];
  return {
    t,
    requiredMultiple,
    emailValidator,
    passwordValidator,
    confirmedValidator,
    integerValidator,
    regexValidator,
    alphaValidator,
    urlValidator,
    lengthValidator,
    alphaDashValidator,
    integerPositive,
    emailRules,
    requiredRules,
    phoneRules,
    domainValidator
  }
}




