const filterBoolean = <T>(arr: T[]) =>
	arr.filter(Boolean) as Exclude<T, null | undefined | false>[];

type ArgType =
	| string
	| Record<string, boolean | null | undefined>
	| undefined
	| null
	| false
	| ArgType[];

/**
 * Function that concatenates class names together  \
 * Can accept an array or any number or arguments  \
 * Also accepts an object where key is class name and value is boolean  \
 * For example all of the following equal 'class1 class2 class3':  \
 * cn('class1', 'class2', 'class3')  \
 * cn(['class1', 'class2', 'class3'])  \
 * cn('class1', ['class2', 'class3'])  \
 * cn({ class1: true, class2: true, class3: true, class4: false })  \
 * cn('class1', ['class2', { class3: true, class4: false }])
 */
export const cn = (...args: ArgType[]): string => {
	return filterBoolean(args)
		.map((arg) => {
			if (typeof arg === 'string') return arg;
			if (Array.isArray(arg)) return cn(...arg);
			if (typeof arg === 'object') {
				return cn(
					...Object.entries(arg)
						.filter(([, bool]) => bool)
						.map(([className]) => className)
				);
			}
			return '';
		})
		.filter(Boolean)
		.join(' ');
};
