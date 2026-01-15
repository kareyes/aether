<script lang="ts" generics="TData, TValue">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import * as Table from "$lib/components/ui/table/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import {
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type RowSelectionState,
		type SortingState,
		type VisibilityState,
		type ExpandedState,
		type Column,
		type Row,
		FlexRender,
		createSvelteTable,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		getExpandedRowModel
	} from "./index.js";
	import { cn } from "$lib/utils.js";

	type TableVariant = 'default' | 'striped' | 'bordered' | 'compact';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		filterColumn?: string;
		filterPlaceholder?: string;
		pageSize?: number;
		pageSizeOptions?: number[];
		showPageSizeSelector?: boolean;
		showFilter?: boolean;
		showColumnToggle?: boolean;
		showPagination?: boolean;
		showRowSelection?: boolean;
		variant?: TableVariant;
		expandable?: boolean;
		selectionMode?: 'multi' | 'single' | 'none';
		getRowCanExpand?: (row: Row<TData>) => boolean;
		renderSubComponent?: import('svelte').Snippet<[{ row: Row<TData> }]>;
		onPageChange?: (page: number, action?: 'next' | 'previous') => void;
		onPageSizeChange?: (pageSize: number) => void;
		onRowSelectionChange?: (selectedRows: TData[]) => void;
	};

	let { 
		data, 
		columns,
		filterColumn = "email",
		filterPlaceholder = "Filter...",
		pageSize = 10,
		pageSizeOptions = [10, 20, 30, 40, 50],
		showPageSizeSelector = true,
		showFilter = true,
		showColumnToggle = true,
		showPagination = true,
		showRowSelection = true,
		variant = 'default',
		expandable = false,
		selectionMode = 'multi',
		getRowCanExpand = () => true,
		renderSubComponent,
		onPageChange,
		onPageSizeChange,
		onRowSelectionChange
	}: DataTableProps<TData, TValue> = $props();

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let rowSelection = $state<RowSelectionState>({});
	let columnVisibility = $state<VisibilityState>({});
	let expanded = $state<ExpandedState>({});

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get columnFilters() {
				return columnFilters;
			},
			get expanded() {
				return expanded;
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand,
		enableRowSelection: selectionMode !== 'none',
		enableMultiRowSelection: selectionMode === 'multi',
		onPaginationChange: (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
			if (typeof updater === "function") {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
			onPageSizeChange?.(pagination.pageSize);
		},
		onSortingChange: (updater: SortingState | ((old: SortingState) => SortingState)) => {
			if (typeof updater === "function") {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
			if (typeof updater === "function") {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater: VisibilityState | ((old: VisibilityState) => VisibilityState)) => {
			if (typeof updater === "function") {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		onRowSelectionChange: (updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
			if (typeof updater === "function") {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
			if (onRowSelectionChange) {
				const selectedRowIds = Object.keys(rowSelection).filter(key => rowSelection[key]);
				const selectedData = data.filter((_, index) => selectedRowIds.includes(String(index)));
				onRowSelectionChange(selectedData);
			}
		},
		onExpandedChange: (updater: ExpandedState | ((old: ExpandedState) => ExpandedState)) => {
			if (typeof updater === "function") {
				expanded = updater(expanded);
			} else {
				expanded = updater;
			}
		}
	});
</script>
{#if showFilter || showColumnToggle}
		<div class="flex items-center py-4">
			{#if showFilter}
				<Input
					placeholder={filterPlaceholder}
					value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
					oninput={(e) => table.getColumn(filterColumn)?.setFilterValue(e.currentTarget.value)}
					onchange={(e) => {
						table.getColumn(filterColumn)?.setFilterValue(e.currentTarget.value);
					}}
					class="max-w-sm"
				/>
			{/if}
			{#if showColumnToggle}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="outline" class="ms-auto">
								Columns <ChevronDownIcon class="ms-2 size-4" />
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						{#each table
							.getAllColumns()
							.filter((col: Column<TData>) => col.getCanHide()) as column (column.id)}
							<DropdownMenu.CheckboxItem
								class="capitalize"
								bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}
							>
								{column.id}
							</DropdownMenu.CheckboxItem>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
	{/if}
	<div class={cn(
		"rounded-md border",
		variant === 'bordered' && "border-2",
		variant === 'compact' && "text-xs"
	)}>
		<Table.Root>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#if expandable}
							<Table.Head class={cn(
								"w-12",
								variant === 'bordered' && "border-r",
								variant === 'compact' && "py-1.5 px-2"
							)} />
						{/if}
						{#each headerGroup.headers as header (header.id)}
						<Table.Head class={cn(
							"[&:has([role=checkbox])]:ps-3",
							variant === 'bordered' && "border-r last:border-r-0",
							variant === 'compact' && "py-1.5 px-2"
						)}>
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row, index (row.id)}
					<Table.Row 
						data-state={row.getIsSelected() && "selected"}
						class={cn(
							variant === 'striped' && index % 2 === 1 && "bg-muted/30",
							variant === 'compact' && "[&>td]:py-1.5 [&>td]:px-2"
						)}
					>
						{#if expandable && row.getCanExpand()}
							<Table.Cell class={cn(
								"w-12",
								variant === 'bordered' && "border-r"
							)}>
								<Button
									variant="ghost"
									size="sm"
									class="h-8 w-8 p-0"
									onclick={() => row.toggleExpanded()}
								>
									<ChevronDownIcon 
										class={cn(
											"h-4 w-4 transition-transform",
											row.getIsExpanded() && "rotate-180"
										)}
									/>
								</Button>
							</Table.Cell>
						{/if}
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell class={cn(
								"[&:has([role=checkbox])]:ps-3",
								variant === 'bordered' && "border-r last:border-r-0"
							)}>
								<FlexRender
									content={cell.column.columnDef.cell}
									context={cell.getContext()}
								/>
							</Table.Cell>
						{/each}
					</Table.Row>
					{#if expandable && row.getIsExpanded()}
						<Table.Row class="hover:bg-transparent ">
							<Table.Cell colspan={row.getVisibleCells().length + (row.getCanExpand() ? 1 : 0)} class="p-0">
								<div class="p-4 bg-muted/30">
									{#if renderSubComponent}
										{@render renderSubComponent({ row })}
									{/if}
								</div>
							</Table.Cell>
						</Table.Row>
					{/if}
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">
							No results.
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	{#if showPagination}
		<div class="flex items-center justify-end space-x-2 pt-4">
			{#if showRowSelection}
				<div class="text-muted-foreground flex-1 text-sm">
					{table.getFilteredSelectedRowModel().rows.length} of
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
			{/if}
			{#if showPageSizeSelector}
				<div class="flex items-center space-x-2">
					<p class="text-sm font-medium">Rows per page</p>
					<Select.Select
						value={String(pagination.pageSize)}
						options={pageSizeOptions.map(size => ({ value: String(size), label: String(size) }))}
						onSelectionChange={(v: string | undefined) => {
							if (v) {
								const newSize = Number(v);
								if (newSize !== pagination.pageSize) {
									pagination = { ...pagination, pageSize: newSize, pageIndex: 0 };
									onPageSizeChange?.(newSize);
								}
							}
						}}
						size="sm"
						triggerClass="h-8 w-[70px]"
					/>
				</div>
			{/if}
			<div class="space-x-2">
				<Button
					variant="outline"
					size="sm"
					onclick={() => {
						table.previousPage();
						onPageChange?.(pagination.pageIndex - 1, 'previous');
					}}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onclick={() => {
						table.nextPage();
						onPageChange?.(pagination.pageIndex + 1, 'next');
					}}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	{/if}
