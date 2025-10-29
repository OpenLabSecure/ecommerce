import { HttpTypes } from "@medusajs/types"
import { forwardRef, useMemo } from "react"
import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"

const CountrySelect = forwardRef<
  HTMLSelectElement,
  Omit<NativeSelectProps, "children"> & {
    region?: HttpTypes.StoreRegion | null
  }
>(({ region, defaultValue, ...props }, ref) => {
  const countryOptions = useMemo(() => {
    if (!region?.countries) {
      return []
    }

    return region.countries
      .map((country) => ({
        value: country.iso_2,
        label: country.display_name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [region])

  // Debug: mostrar en consola
  console.log("CountrySelect - Region:", region?.name)
  console.log("CountrySelect - Countries:", countryOptions)

  return (
    <NativeSelect ref={ref} defaultValue={defaultValue} {...props}>
      <option value="">Selecciona un país</option>
      {countryOptions.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </NativeSelect>
  )
})

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
