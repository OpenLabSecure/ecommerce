import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-sm">
      <Text className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
        {title}
      </Text>
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {items?.map((i) => (
            <div
              key={i.value}
              className={clx(
                "relative flex items-center transition-all duration-200"
              )}
            >
              <RadioGroup.Item
                checked={i.value === value}
                className="hidden peer"
                id={i.value}
                value={i.value}
              />
              <Label
                htmlFor={i.value}
                className={clx(
                  "flex items-center gap-x-2 px-4 py-2 rounded-lg text-sm cursor-pointer transition-all duration-200 select-none border",
                  {
                    "bg-blue-50 dark:bg-blue-950 border-blue-600 dark:border-blue-400 text-blue-900 dark:text-blue-100 font-medium shadow-sm": i.value === value,
                    "bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600": i.value !== value,
                  }
                )}
                data-testid="radio-label"
                data-active={i.value === value}
              >
                {i.value === value && (
                  <EllipseMiniSolid className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                )}
                <span>{i.label}</span>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup