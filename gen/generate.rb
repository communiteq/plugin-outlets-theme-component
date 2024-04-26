require 'find'

source_dir = '/home/discourse/discourse-latest'
output_file_path = '../common/head_tag.html'

File.open(output_file_path, 'w') do |output_file|
  Find.find(source_dir) do |path|
    if FileTest.file?(path) && (path.end_with?('.hbs') || path.end_with?('.gjs'))
      File.open(path, 'r') do |file|
        file.read.scan(/(<PluginOutlet\s+@name="([^"]+)"\s+[^>]*\/>)/m).each do |match|
          entire_tag = match[0].gsub("{{", "\\{{").gsub('<', '&lt;').gsub('>', '&gt;')
          name_attr = match[1]
          next if name_attr == "test-name"

          output_file.puts <<~HEREDOC
            <script type="text/x-handlebars" data-template-name="/connectors/#{name_attr}/plugin-outlet-component">
              <PluginOutletConnectorComponent @name="#{name_attr}">#{entire_tag}</PluginOutletConnectorComponent>
            </script>
          HEREDOC
        end
        file.rewind
        file.read.scan(/(<PluginOutlet\s+@name="([^"]+)"\s+[^>]+[^\/]>)/m).each do |match|
          entire_tag = match[0].gsub("{{", "\\{{").gsub('<', '&lt;').gsub('>', '&gt;')
          name_attr = match[1]
          next if name_attr == "outlet-with-default"

          output_file.puts <<~HEREDOC
            <script type="text/x-handlebars" data-template-name="/connectors/#{name_attr}__before/plugin-outlet-component">
              <PluginOutletConnectorComponent @type="wrapper-before" @name="#{name_attr}">#{entire_tag}</PluginOutletConnectorComponent>
            </script>
            <script type="text/x-handlebars" data-template-name="/connectors/#{name_attr}__after/plugin-outlet-component">
              <PluginOutletConnectorComponent @type="wrapper-after" @name="#{name_attr}">#{entire_tag}</PluginOutletConnectorComponent>
            </script>
          HEREDOC
        end

      end
    end
  end
end

