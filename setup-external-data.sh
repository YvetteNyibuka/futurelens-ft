#!/bin/bash

echo "🚀 Setting up external data storage for FutureLens Rwanda..."

# Create a new directory for data repository
mkdir -p ../futurelens-data
cd ../futurelens-data

# Initialize git repository
git init
echo "# FutureLens Rwanda - Health Data Repository" > README.md
echo "" >> README.md
echo "This repository contains the complete Rwanda Demographic and Health Survey dataset" >> README.md
echo "used by the FutureLens Rwanda analytics platform." >> README.md
echo "" >> README.md
echo "## Dataset Information" >> README.md
echo "- **Source**: National Institute of Statistics of Rwanda (NISR)" >> README.md
echo "- **Years**: 1992-2020" >> README.md
echo "- **Records**: 978,687 health records" >> README.md
echo "- **Surveys**: DHS surveys across 28 years" >> README.md
echo "" >> README.md
echo "## File Structure" >> README.md
echo "- \`processed-data.json\` - Complete processed dataset" >> README.md
echo "- \`chunk_*.json\` - Data chunks for efficient loading" >> README.md
echo "- \`metadata.json\` - Dataset metadata and schema" >> README.md

# Create .gitignore for the data repo
cat > .gitignore << EOF
# Temporary files
*.tmp
*.log

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF

# Copy data files from main project
echo "📁 Copying data files..."
cp -r ../futurelens-ft/public/data/* ./

# Create metadata file
cat > metadata.json << EOF
{
  "dataset_info": {
    "name": "Rwanda Demographic and Health Survey Data",
    "source": "National Institute of Statistics of Rwanda (NISR)",
    "years_covered": "1992-2020", 
    "total_records": 978687,
    "last_updated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "version": "1.0.0"
  },
  "files": {
    "processed-data.json": {
      "description": "Complete processed health dataset",
      "size_mb": "~150",
      "records": 978687
    },
    "chunks": {
      "description": "Data split into manageable chunks",
      "chunk_size": 8000,
      "total_chunks": 118
    }
  },
  "api_endpoints": {
    "base_url": "https://raw.githubusercontent.com/YvetteNyibuka/futurelens-data/main",
    "complete_dataset": "/processed-data.json",
    "chunk_pattern": "/chunk_{number}.json",
    "metadata": "/metadata.json"
  }
}
EOF

echo "✅ Data repository setup complete!"
echo "📍 Location: $(pwd)"
echo "📊 Files copied: $(ls -1 *.json | wc -l) JSON files"

# Add and commit files
git add .
git commit -m "Initial commit: Rwanda health dataset for FutureLens platform

- Added complete processed health dataset (978,687 records)
- Included data chunks for efficient loading
- Added metadata and documentation
- Source: NISR Demographic and Health Surveys 1992-2020"

echo ""
echo "🔗 Next steps:"
echo "1. Create GitHub repository: gh repo create futurelens-data --public"
echo "2. Push data: git push -u origin main"
echo "3. The data will be available at: https://raw.githubusercontent.com/YvetteNyibuka/futurelens-data/main/"
echo ""