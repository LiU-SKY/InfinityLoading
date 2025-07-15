// extensions/ExitInlineCodeOnEnter.ts
import { Extension } from '@tiptap/core'

export const ExitInlineCodeOnEnter = Extension.create({
    name: 'exitInlineCodeOnEnter',

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const { state } = editor
                const { $from } = state.selection

                const isInCode = $from.marks().some(mark => mark.type.name === 'code')

                if (isInCode) {
                    return editor
                        .chain()
                        .unsetCode()     // <code> 마크 해제
                        .splitBlock()    // 일반 줄바꿈
                        .run()
                }

                return false // 기본 동작 유지
            },
        }
    },
})
