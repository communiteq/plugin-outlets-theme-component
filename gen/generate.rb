require 'find'

source_dir = '/var/www/discourse/' 
output_file_path = '../common/head_tag.html' 

File.open(output_file_path, 'w') do |output_file|
  Find.find(source_dir) do |path|
    if FileTest.file?(path) && path.end_with?('.hbs')
      File.open(path, 'r') do |file|
        file.read.scan(/(<PluginOutlet\s+@name="([^"]+)"\s+[^>]+>)/m).each do |match|
          entire_tag = match[0].gsub("{{", "\\{{").gsub('<', '&lt;').gsub('>', '&gt;')
          name_attr = match[1]
  
          output_file.puts <<~HEREDOC
            <script type="text/x-handlebars" data-template-name="/connectors/#{name_attr}/plugin-outlet-component">
              <PluginOutletConnectorComponent @name="#{name_attr}">#{entire_tag}</PluginOutletConnectorComponent>
            </script>
          HEREDOC
        end
      end
    end
  end
end

