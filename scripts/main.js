
import { getEntries, useJournalEntries } from './JournalDataProvider.js'
import { EntryListComponent } from './JournalEntryList.js'
import { JournalFormComponent } from './JournalFormComponent.js'

JournalFormComponent()
getEntries()
useJournalEntries()
EntryListComponent()