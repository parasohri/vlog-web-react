import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({ label, name = 'CONTENT', control, defaultValue = '' }) {
    return (
        <div className="w-full">
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        value={value}
                        apiKey="o7xjx1kvla40i5yh3dlj41baxcpfts4lwi87myyts5l86o65"
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table code help wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            forced_root_block: false, // Disable <p> wrapping
                        }}
                        onEditorChange={(content) => onChange(content.replace(/<\/?p>/g, ''))}
                    />
                )}
            />
        </div>
    );
}

export default RTE;
