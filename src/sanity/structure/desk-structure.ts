import { RiHome2Line, RiNewspaperLine } from 'react-icons/ri'
import { StructureBuilder } from 'sanity/structure'
import { ConfigContext, DocumentStore } from 'sanity'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { MdOutlineDatasetLinked } from 'react-icons/md'

const content = ['page']
const types = ['resource']

export const structure = (
  S: StructureBuilder,
  context: ConfigContext & { documentStore: DocumentStore }
) =>
  S.list()
    .title('Content')
    .items([
      // --------------------- Content ---------------------
      ...S.documentTypeListItems().filter((listItem) =>
        content.includes(listItem.getId()?.toString() || '')
      ),
      S.documentTypeListItem('article').icon(RiNewspaperLine).title('Module'),
      // --------------------- Divider ---------------------
      S.divider(),
      // --------------------- Types ---------------------
      S.documentTypeListItem('resource').icon(MdOutlineDatasetLinked),
      // --------------------- Divider ---------------------
      S.divider(),
      // --------------------- Settings ---------------------
      S.listItem()
        .title('Site Settings')
        .icon(RiHome2Line)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
    ])
